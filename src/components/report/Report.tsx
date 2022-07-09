import React from 'react';
import { Gateway, Project, Transaction, TransactionBreakdown } from '../../common/interfaces';
import ReportTable from './table/ReportTable';
import './Report.css';
import ReportBreakdown from './breakdown/ReportBreakdown';

interface ReportProps{
  selectedProject?: Project,
  selectedGateway?: Gateway,
  transactionBreakdown : TransactionBreakdown,
  transactionList: Array<Transaction>
}

const Report: React.FC<ReportProps> = ({ selectedProject, selectedGateway, transactionList, transactionBreakdown }: ReportProps) => {
  return (
    <div className="report-container">
      <ReportBreakdown
        transactionList={transactionList}
        transactionBreakdown={transactionBreakdown}
        selectedGateway={selectedGateway}
        selectedProject={selectedProject}
      />
    </div>
  )
}

export default Report;
