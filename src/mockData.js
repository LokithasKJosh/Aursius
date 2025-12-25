// 模拟销售额折线图数据
export const salesData = {
  title: '月度销售额趋势',
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月'],
  series: [
    { name: '产品A', data: [120, 200, 150, 80, 70, 110] },
    { name: '产品B', data: [85, 120, 135, 90, 150, 180] }
  ]
};

// 模拟用户分布饼图数据
export const userDistribution = {
  title: '用户地域分布',
  data: [
    { value: 335, name: '北京' },
    { value: 310, name: '上海' },
    { value: 234, name: '深圳' },
    { value: 135, name: '杭州' },
    { value: 154, name: '其他' }
  ]
};

// 模拟一个简单的API响应格式（为后续连接真实后端做准备）
export const mockApi = {
  fetchSalesData: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ code: 200, data: salesData, message: 'success' });
      }, 500); // 模拟500ms网络延迟
    });
  }
};