import { ItemTransactionPair, ItemTransactionGroupingItem, TransactionBreakdown, ReportInputProps,
  TransactionPercentageBreakdown, Gateway, Project, ChartData, ChartElement } from '../common/interfaces'
import { colors } from '../common/format';

interface TransactionComputation{
    (transactionInput: ReportInputProps) : TransactionBreakdown;
}

interface TransactionPercentageComputation{
  (transactionInput: TransactionBreakdown) : TransactionPercentageBreakdown;
}

interface ChartDataComputation{
  (breakdown: TransactionBreakdown, percentageBreakdown: TransactionPercentageBreakdown, projectList: Array<Project>, gatewayList: Array<Gateway>) : ChartData
}

const isWhatPercentOf = (numA: number, numB: number) => {
  return (numA / numB) * 100;
}

const getTransactionBreakdownPerProject = ({ transactionList }: ReportInputProps) => {
  const breakdown = new Map<string, ItemTransactionPair>();
  let totalCost = 0;
  transactionList.forEach(t => {
    const { amount, projectId } = { ...t };
    totalCost += amount;
    if (breakdown.has(projectId)) {
      const projectTransactions = breakdown.get(projectId)!;
      const projectTotal = projectTransactions.total;
      projectTransactions.transactionList.push(t);
      const curentTotalPerProject = projectTotal + amount
      projectTransactions.total = curentTotalPerProject;
    } else {
      const newItem = { transactionList: [], total: amount }
      breakdown.set(projectId, newItem);
    }
  });
  return {
    transactionMap: breakdown,
    groupedBy: ItemTransactionGroupingItem.PROJECT,
    total: totalCost
  }
}

const getTransactionBreakdownPerGateway = ({ transactionList }: ReportInputProps) => {
  const breakdown = new Map<string, ItemTransactionPair>();
  let totalCost = 0;
  transactionList.forEach(t => {
    const { amount, gatewayId, paymentId } = { ...t };
    totalCost += amount;
    if (breakdown.has(gatewayId)) {
      const gatewayTransactions = breakdown.get(gatewayId)!;
      const gatewayTotal = gatewayTransactions.total;
      gatewayTransactions.transactionList.push(t);
      const currentTotalPerGateway = gatewayTotal + amount
      gatewayTransactions.total = currentTotalPerGateway;
      console.log(`Total for ${gatewayId} at step ${paymentId}: ${currentTotalPerGateway}`)
    } else {
      const newItem = { transactionList: [t], total: amount }
      breakdown.set(gatewayId, newItem);
    }
  });
  return {
    transactionMap: breakdown,
    groupedBy: ItemTransactionGroupingItem.GATEWAY,
    total: totalCost
  }
}

const getTransactionBreakdown: TransactionComputation = ({ selectedProject, selectedGateway, transactionList } : ReportInputProps) => {
  if (selectedGateway === undefined && selectedProject !== undefined) {
    return getTransactionBreakdownPerGateway({ selectedProject, selectedGateway, transactionList });
  } else {
    return getTransactionBreakdownPerProject({ selectedProject, selectedGateway, transactionList });
  }
}

export const getPercentagesPerItems: TransactionPercentageComputation = ({ transactionMap, total }: TransactionBreakdown) => {
  const percentageMap = new Map<string, number>();

  Array.from(transactionMap.keys()).forEach(itemId => {
    const itemValues = transactionMap.get(itemId)!;
    const itemTotal = itemValues.total;
    const percentage = isWhatPercentOf(itemTotal, total);
    percentageMap.set(itemId, percentage);
  });
  return percentageMap;
}

export const getChartData: ChartDataComputation = (breakdown, percentageBreakdown, projectList, gatewayList) => {
  // id: number;
  // title: string;
  // type: string;
  // data: Element[];

  // id: number;
  // name: string;
  // value: number;
  const data: ChartElement[] = [];
  const chartData = {
    title: '',
    type: breakdown.groupedBy,
    data
  }
  if (breakdown.groupedBy === ItemTransactionGroupingItem.GATEWAY) {
    gatewayList.forEach((g, i) => {
      let percentage = Math.floor(percentageBreakdown.get(g.gatewayId)!);
      if (Number.isNaN(percentage)) {
        percentage = 0;
      }
      const color = colors[i % colors.length];
      data.push({ id: g.gatewayId, name: g.name, value: percentage, backgroundColor: color, color })
    });
  } else {
    projectList.forEach((p, i) => {
      let percentage = Math.floor(percentageBreakdown.get(p.projectId)!);
      if (Number.isNaN(percentage)) {
        percentage = 0;
      }
      const color = colors[i % colors.length];
      data.push({ id: p.projectId, name: p.name, value: percentage, backgroundColor: color, color })
    });
  }

  return chartData;
}

export default getTransactionBreakdown;
