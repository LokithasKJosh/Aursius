CREATE DATABASE IF NOT EXISTS `visual_dashboard` DEFAULT CHARACTER SET utf8mb4;
USE `visual_dashboard`;
-- 1. 用户分布表 (对应 mockData.js 中的 userDistribution)
CREATE TABLE `user_distribution` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `region` VARCHAR(50) NOT NULL COMMENT '地域，如：北京、上海',
  `user_count` INT NOT NULL COMMENT '用户数量',
  `record_date` DATE DEFAULT (CURDATE()) COMMENT '记录日期'
) COMMENT '用户地域分布表';

-- 2. 产品销售额表 (对应 mockData.js 中的 salesData)
CREATE TABLE `product_sales` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `product_name` VARCHAR(50) NOT NULL COMMENT '产品名称，如：产品A、产品B',
  `month` VARCHAR(20) NOT NULL COMMENT '月份，如：1月、2月',
  `sales_amount` DECIMAL(12, 2) NOT NULL COMMENT '销售额',
  `record_date` DATE DEFAULT (CURDATE())
) COMMENT '产品月度销售额表';

-- 插入用户分布数据
INSERT INTO `user_distribution` (`region`, `user_count`) VALUES
('北京', 335),
('上海', 310),
('深圳', 234),
('杭州', 135),
('其他', 154);

-- 插入产品销售额数据（这是重点，结构稍复杂）
-- 模拟产品A在1-6月的数据
INSERT INTO `product_sales` (`product_name`, `month`, `sales_amount`) VALUES
('产品A', '1月', 120.00),
('产品A', '2月', 200.00),
('产品A', '3月', 150.00),
('产品A', '4月', 80.00),
('产品A', '5月', 70.00),
('产品A', '6月', 110.00),
('产品B', '1月', 85.00),
('产品B', '2月', 120.00),
('产品B', '3月', 135.00),
('产品B', '4月', 90.00),
('产品B', '5月', 150.00),
('产品B', '6月', 180.00);

-- 查询用户分布（直接对应 mockData.js 中的 userDistribution）
SELECT region AS `name`, user_count AS `value` FROM `user_distribution`;

-- 查询产品销售额，并聚合成与 mockData.js 中 salesData 相同的结构（这是关键！）
SELECT
    GROUP_CONCAT(DISTINCT `month` ORDER BY FIELD(`month`, '1月','2月','3月','4月','5月','6月')) AS `xAxis`,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'name', `product_name`,
            'data', (
                SELECT JSON_ARRAYAGG(sales_amount)
                FROM `product_sales` ps2
                WHERE ps2.product_name = ps1.product_name
                ORDER BY FIELD(ps2.month, '1月','2月','3月','4月','5月','6月')
            )
        )
    ) AS `series`
FROM `product_sales` ps1
GROUP BY 1; -- 这个查询可能只返回一行，但结构正确