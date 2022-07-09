import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ChartData } from '../../../common/interfaces';
import './ReportGraph.css';
import { colors } from '../../../common/format';
import ReportTotal from '../total/ReportTotal';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  chartData: ChartData;

}

const ChartHeader = ({ chartData }: DoughnutChartProps) => {
  return (
    <div className="chart-header">
      {chartData.data.map(chartInfo => (
        <div className="chart-info">
          <div className="chart-info-fill" style={{ backgroundColor: chartInfo.backgroundColor }} />
          <div>{chartInfo.name}</div>
        </div>
      ))}
    </div>
  )
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  chartData,
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        // position: 'bottom' as const,
        display: false
      },
      title: {
        display: false,
        text: chartData ? chartData.title : 'Please select an app',
      },

    },
    cutout: '50%',
  };

  const labelsSwitcher = () => {
    if (chartData) {
      return chartData.data;
    }
    return [];
  };
  const labels = labelsSwitcher();

  const data = {
    labels: labels?.map((item: { name: any }) => item?.name),
    datasets: [
      {
        label: '# of Votes',
        data: chartData
          ? labels?.map((item: { value: any }) => item?.value)
          : 0,
        borderWidth: 0,
        spacing: 10,
        borderRadius: 5,
        backgroundColor: colors,
        borderColor: colors,
      },

    ],
  };

  return (
    <div className="graph-container">
      <ChartHeader chartData={chartData} />
      <div className="graph-data">
        <div>
          <Doughnut data={data} options={options} />
        </div>
      </div>
      <ReportTotal total={500} />
    </div>
  );
};

export default DoughnutChart;
