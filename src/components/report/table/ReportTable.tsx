import React from 'react';
import { formatFlotingDisplay, formatDate } from '../../../common/format';
import { Gateway, Transaction } from '../../../common/interfaces';
import './ReportTable.css'

interface ReportTableProps{
    transactionList: Array<Transaction>,
    showGateway: boolean,
    gatewayList: Array<Gateway>
}

const ReportTable: React.FC<ReportTableProps> = ({ transactionList, showGateway, gatewayList } : ReportTableProps) => {
  const findGatewayName = (gatewayList: Array<Gateway>, id: string) => {
    return gatewayList.filter(g => g.gatewayId === id).map(g => g.name)
  }

  const mapTableRows = () => {
    return transactionList.map(t => (
      <tr key={t.paymentId}>
        <td key={0} className="first-column">{formatDate(t.created)}</td>
        { showGateway &&
        <td key={1}>{findGatewayName(gatewayList, t.gatewayId)}</td>}
        <td key={2}>{t.paymentId}</td>
        <td key={3} className="last-column">
          {formatFlotingDisplay(t.amount)}
          &nbsp;
          USD
        </td>
      </tr>
    ))
  }

  const mapTableHeader = () => {
    return (
      <tr key={-1}>
        <th className="first-column" key={0}>Date</th>
        { showGateway &&
        <th key={2}>Gateway</th>}
        <th key={3}>Transaction ID</th>
        <th key={4} className="last-column">Amount</th>
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
