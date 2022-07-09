import React, { useState } from 'react';
import { TransactionBreakdown, Transaction, Project, Gateway } from '../../../common/interfaces';
import ReportTable from '../table/ReportTable';
import formatFlotingDisplay, { formatPrice } from '../../../common/format';
import './ReportBreakdown.css'
import ReportTotal from '../total/ReportTotal';

interface ReportBreakdownProps{
    transactionList: Array<Transaction>,
    transactionBreakdown: TransactionBreakdown,
    selectedProject?: Project,
    selectedGateway?: Gateway
}

interface BreakdownHeaderProps{
    selectedGateway?: Gateway,
    selectedProject?: Project
}

interface BreakdownItemProps{
    id: string,
    headerName: string,
    total: number,
    transactionList: Array<Transaction>,
    shouldDisplayTable: boolean,
    shouldDisplayHeader: boolean,
    onSelectItem: (id: string) => void,
    showGateway: boolean,

}
interface BreakdownItemHeaderProps{
    headerName: string,
    total: number
}

const BreakdownHeader = ({ selectedGateway, selectedProject }: BreakdownHeaderProps) => {
  return (
    <div className="report-header-container">
      <div className="report-header-item">
        {selectedProject ? selectedProject.name : 'All projects'}
      </div>
      <div className="report-header-item">
        &nbsp;|&nbsp;
      </div>
      <div className="report-header-item">
        {selectedGateway ? selectedGateway.name : 'All gateways'}
      </div>
    </div>
  )
}

const BreakdownItemHeader = ({ headerName, total }: BreakdownItemHeaderProps) => {
  return (
    <div className="report-breakdown-item-header">
      <div className="w-28 flex items-center justify-center">{headerName}</div>
      <div className="w-72 flex items-center justify-center">{formatPrice(total)}</div>
    </div>
  )
}

const BreakdownItem = ({ id, transactionList, headerName, total, shouldDisplayTable, shouldDisplayHeader, onSelectItem, showGateway }: BreakdownItemProps) => {
  console.log('Should show table', shouldDisplayTable)
  return (
    <div key={id} onClick={() => onSelectItem(id)}>
      { shouldDisplayHeader &&
      <BreakdownItemHeader headerName={headerName} total={total} />}
      { shouldDisplayTable &&
      <ReportTable transactionList={transactionList} showGateway={showGateway} />}
    </div>
  )
}

const ReportBreakdown: React.FC<ReportBreakdownProps> = ({ transactionList, transactionBreakdown, selectedProject, selectedGateway }: ReportBreakdownProps) => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);

  const selectOrDeselectItem = (id: string) => {
    console.log('selecting item', id)
    if (selectedItem === id) {
      setSelectedItem(undefined);
    } else {
      setSelectedItem(id);
    }
  }

  const mapBreakdownItems = () => {
    const breakdownMap = transactionBreakdown.transactionMap;
    const breakdownItems = Array.from(breakdownMap.keys())
    return breakdownItems.map(id => (
      <BreakdownItem
        headerName={id}
        total={breakdownMap.get(id)!.total}
        transactionList={breakdownMap.get(id)!.transactionList}
        shouldDisplayTable={selectedItem === id || (selectedGateway !== undefined && selectedProject !== undefined)}
        onSelectItem={selectOrDeselectItem}
        showGateway={selectedGateway === undefined && selectedProject === undefined}
        shouldDisplayHeader={!(selectedGateway !== undefined && selectedProject !== undefined)}
        id={id}
      />
    ))
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="report-breakdown-container">
        <BreakdownHeader selectedProject={selectedProject} selectedGateway={selectedGateway} />
        <div className="report-breakdown-items">
          {mapBreakdownItems()}
        </div>
      </div>
      <ReportTotal total={transactionBreakdown.total} />
    </div>

  )
}

export default ReportBreakdown;
