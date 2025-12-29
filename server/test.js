const express = require('express');
const app = express();
const port = 3001; // 换一个端口，避免冲突

app.get('/', (req, res) => {
  res.send('Hello World - 基础测试成功！');
});

app.listen(port, () => {
  console.log(`✅ 基础测试服务已启动: http://localhost:${port}`);
});