import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';
import { salesData } from '../mockData'; // 引入模拟数据

const SalesChart = () => {
  // 配置ECharts的选项
  const option = {
    title: { text: salesData.title, left: 'center' },
    tooltip: { trigger: 'axis' },
    legend: { 
      data: salesData.series.map(item => item.name),
      top: '30px'
    },
    grid: { top: '80px', right: '30px', bottom: '30px', left: '60px' },
    xAxis: {
      type: 'category',
      data: salesData.xAxis,
      axisLabel: { rotate: 45 } // 如果标签过长可以旋转
    },
    yAxis: { type: 'value' },
    series: salesData.series.map(item => ({
      name: item.name,
      type: 'line',
      data: item.data,
      smooth: true, // 平滑曲线
      lineStyle: { width: 3 }
    }))
  };

  return (
    <Card 
      title="销售图表（模拟数据）" 
      bordered={true}
      style={{ width: '100%', marginBottom: '20px' }}
    >
      <ReactECharts
        option={option}
        style={{ height: '450px', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
      <div style={{ marginTop: '15px', color: '#888', fontSize: '0.9em' }}>
        <p>📊 此图表使用本地模拟数据渲染。数据格式：</p>
        <code>{JSON.stringify(salesData.series)}</code>
      </div>
    </Card>
  );
};

export default SalesChart;
