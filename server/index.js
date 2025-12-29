// 新增：捕获未捕获的同步异常
process.on('uncaughtException', (err) => {
  console.error('【致命错误】未捕获的异常:', err);
  process.exit(1);
});

// 新增：捕获未处理的Promise拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('【致命错误】未处理的Promise拒绝:', reason);
  process.exit(1);
});

const express = require('express');
const mysql = require('mysql2/promise'); // 使用Promise版本
const cors = require('cors');
const app = express();
const port = 3000; // 后端服务端口

// 启用CORS，允许你的前端（运行在5173端口）访问
app.use(cors());
// 解析JSON格式的请求体
app.use(express.json());

// 创建数据库连接池（效率更高）
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // 你的MySQL用户名
  password: '10585', // 你的MySQL密码
  database: 'visual_dashboard', // 你创建的数据库名
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 1. 获取产品销售数据的接口
app.get('/api/product-sales', async (req, res) => {
  try {
    // 【关键】请将您完整的复杂查询语句替换下面的文字
const complexQuery = `
  SELECT
      GROUP_CONCAT(DISTINCT month ORDER BY FIELD(month, '1月','2月','3月','4月','5月','6月')) AS xAxis,
      JSON_ARRAYAGG(
          JSON_OBJECT(
              'name', product_name,
              'data', (
                  SELECT JSON_ARRAYAGG(sales_amount)
                  FROM product_sales ps2
                  WHERE ps2.product_name = ps1.product_name
                  ORDER BY FIELD(ps2.month, '1月','2月','3月','4月','5月','6月')
              )
          )
      ) AS series
  FROM product_sales ps1
  GROUP BY product_name;
`;
    const [results] = await pool.query(complexQuery);
    // 通常，上面的查询会返回一个数组，我们取第一个元素（即整个结构）
    res.json({ code: 200, data: results[0], message: 'success' });
  } catch (error) {
    console.error('产品销售接口错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
});

// 2. 获取用户分布数据的接口
app.get('/api/user-distribution', async (req, res) => {
  try {
    const simpleQuery = `SELECT region AS name, user_count AS value FROM user_distribution;`;
    const [rows] = await pool.query(simpleQuery);
    // 这个查询返回的数组格式直接就是前端需要的
    res.json({ code: 200, data: rows, message: 'success' });
  } catch (error) {
    console.error('用户分布接口错误:', error);
    res.status(500).json({ code: 500, message: '服务器内部错误' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`后端API服务已启动，运行在 http://localhost:${port}`);
});