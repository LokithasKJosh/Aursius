import React from 'react';
import { Layout, Row, Col, Card, Statistic, Progress } from 'antd';
import { ArrowUpOutlined, UserOutlined } from '@ant-design/icons';
import SalesChart from './components/SalesChart';
import { userDistribution } from './mockData';
import 'antd/dist/reset.css'; // 引入Ant Design的样式

const { Header, Content } = Layout;

function App() {
  // 计算饼图数据总数，用于概览
  const totalUsers = userDistribution.data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        color: 'white', 
        fontSize: '20px', 
        lineHeight: '64px',
        background: '#001529' // Ant Design 深色主题色
      }}>
        📈 业务数据可视化看板（模拟数据阶段）
      </Header>
      <Content style={{ padding: '24px' }}>
        {/* 数据概览卡片 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="总销售额"
                value={126560}
                prefix="¥"
                valueStyle={{ color: '#3f8600' }}
                suffix={<ArrowUpOutlined />}
              />
              <Progress percent={68} strokeColor="#52c41a" />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="总用户数"
                value={totalUsers}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
              <div>较上月增长 12%</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="订单数" value={8846} />
              <div>日均订单：{Math.round(8846/30)}</div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="完成率" value={85.6} suffix="%" />
              <Progress percent={85.6} status="active" />
            </Card>
          </Col>
        </Row>

        {/* 主图表区 */}
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <SalesChart /> {/* 这里渲染你的折线图组件 */}
          </Col>
          <Col span={8}>
            <Card title={userDistribution.title} bordered={true}>
              <ul>
                {userDistribution.data.map((item, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    <span>{item.name}: </span>
                    <strong>{item.value}</strong>
                    <span> ({((item.value/totalUsers)*100).toFixed(1)}%)</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
                <p><strong>🎯 当前状态：</strong></p>
                <p>✅ 前端模拟数据渲染完成</p>
                <p>⏳ 待接入：MySQL数据库与后端API</p>
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;