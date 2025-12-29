import axios from 'axios';

// 创建axios实例，统一设置基础URL（方便后续部署时修改）
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // 你的后端地址
  timeout: 10000, // 请求超时时间
});

// 定义真正的API服务对象，用来替换 mockApi
export const apiService = {
  // 获取产品销售数据
  fetchSalesData: async () => {
    try {
      const response = await apiClient.get('/api/product-sales');
      // 你的后端接口返回的格式是 { code: 200, data: {...}, message: 'success' }
      // 此处直接返回后端接口中的 `data` 字段，确保其结构与 `salesData` 一致。
      return response.data.data;
    } catch (error) {
      console.error('获取销售数据失败:', error);
      throw error; // 将错误向上抛出，供组件处理
    }
  },

  // 获取用户分布数据
  fetchUserDistribution: async () => {
    try {
      const response = await apiClient.get('/api/user-distribution');
      // 你的后端接口返回的格式是 { code: 200, data: [...], message: 'success' }
      // 此处直接返回后端接口中的 `data` 字段，确保其结构与 `userDistribution.data` 一致。
      return response.data.data;
    } catch (error) {
      console.error('获取用户分布数据失败:', error);
      throw error;
    }
  },
};