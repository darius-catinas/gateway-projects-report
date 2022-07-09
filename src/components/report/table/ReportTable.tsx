import React from 'react';
import { Transaction } from '../../../common/interfaces';
import './ReportTable.css'

interface ReportTableProps{
    transactionList: Array<Transaction>,
    showGateway: boolean,
}

const ReportTable: React.FC<ReportTableProps> = ({ transactionList, showGateway } : ReportTableProps) => {
  const mapTableRows = () => {
    return transactionList.map(t => (
      <tr key={t.paymentId}>
        <td key={0}>{t.created}</td>
        { showGateway &&
        <td key={1}>{t.gatewayId}</td>}
        <td key={2}>{t.paymentId}</td>
        <td key={3}>{t.amount}</td>
      </tr>
    ))
  }

  const mapTableHeader = () => {
    return (
      <tr key={-1}>
        <th key={0}>Date</th>
        { showGateway &&
        <th key={2}>Gateway</th>}
        <th key={3}>Transaction ID</th>
        <th key={4}>Amount</th>
      </tr>
    )
  }

  const tableClassName = `report-table ${showGateway ? '' : 'rt-3'}`;

  return (
    <table className={tableClassName} style={{ marginTop: 14 }}>
      {mapTableHeader()}
      {mapTableRows()}
    </table>
  )
}

export default ReportTable;
