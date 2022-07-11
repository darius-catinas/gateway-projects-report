import React, { useEffect, useState } from 'react';
import { ReportFilters } from '../../components/filter';
import { ReportGraph, ReportBreakdown } from '../../components/report';
import { useGetGatewayListQuery, useGetProjectListQuery, useGetReportMutation } from '../../redux/api';
import getTransactionBreakdown, { getPercentagesPerItems, getChartData } from '../../services/transaction-utils';
import { ChartData, Gateway, Project, Transaction, TransactionBreakdown, TransactionPercentageBreakdown } from '../../common/interfaces';
import './Dashboard.css';
import { ReportGenerateProps } from '../../components/filter/ReportFilters';
import { selectProject } from '../../redux/reducer';

function Dashboard() {
  const projectResponse = useGetProjectListQuery()
  const [projectList, setProjectList] = React.useState<Array<Project>>([])

  const gatewayResponse = useGetGatewayListQuery()
  const [gatewayList, setGatewayList] = React.useState<Array<Gateway>>([])

  const [getReport, result] = useGetReportMutation();
  const [reportAggregatedData, setReportAggregatedData] = useState<TransactionBreakdown | undefined>(undefined)
  const [chartPercentageData, setChartPercentageData] = useState<ChartData | undefined>(undefined)
  const [transactionList, setTransactionList] = useState<Transaction[]>([])

  // const [selectedProject, selectProject] = React.useState<Project | undefined>(undefined);
  // const [selectedGateway, selectGateway] = React.useState<Gateway | undefined>(undefined);
  // const [fromDate, setFromDate] = React.useState<string>('2021-01-01');
  // const [toDate, setToDate] = React.useState<string>('2021-12-31');

  const [{ selectedProject, selectedGateway, fromDate, toDate }, setFilterParameters] = React.useState<ReportGenerateProps>({
    selectedGateway: undefined,
    selectedProject: undefined,
    fromDate: '2021-01-01',
    toDate: '2021-12-31'
  })

  const constructFetchDto = () => {
    return {
      from: fromDate,
      to: toDate,
      projectId: selectedProject ? selectedProject.projectId : undefined,
      gatewayId: selectedGateway ? selectedGateway.gatewayId : undefined
    }
  }

  const fetchReport = () => {
    getReport(constructFetchDto()).then(
      (data) => {
        const reportInputData = (data as any).data as Transaction[];
        const breakdown = getTransactionBreakdown({ transactionList: reportInputData, selectedGateway, selectedProject });
        const percentageResult = getPercentagesPerItems(breakdown);
        const chartData = getChartData(breakdown, percentageResult, projectList, gatewayList);
        setReportAggregatedData(breakdown);
        setChartPercentageData(chartData);
        setTransactionList(reportInputData);
      }
    )
  }

  // useEffect(() => {
  //   fetchReport()
  // }, [])

  useEffect(() => {
    fetchReport()
  }, [selectedProject, selectedGateway, fromDate, toDate])

  useEffect(() => {
    if (gatewayResponse.data) {
      setGatewayList(gatewayResponse.data!)
    }
  }, [gatewayResponse]);

  useEffect(() => {
    if (projectResponse.data) {
      setProjectList(projectResponse.data!)
    }
  }, [projectResponse]);

  const shouldDisplayGraph = chartPercentageData && ((selectedGateway && !selectedProject) || (!selectedGateway && selectedProject));

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-text">
          <h1>Reports</h1>
          <h3>Easily generate a report of your transactions</h3>
        </div>
        <div className="dashboard-filters">
          <ReportFilters
            projectList={projectList}
            gatewayList={gatewayList}
            onGenerateReport={setFilterParameters}
          />
        </div>
      </div>
      <div className="dashboard-reporting">
        { reportAggregatedData && (
        <ReportBreakdown
          selectedGateway={selectedGateway}
          selectedProject={selectedProject}
          transactionList={transactionList}
          transactionBreakdown={reportAggregatedData}
          projectList={projectList}
          gatewayList={gatewayList}
        />
        )}
        { shouldDisplayGraph &&
        <ReportGraph chartData={chartPercentageData} />}
      </div>
    </div>
  );
}

export default Dashboard;
