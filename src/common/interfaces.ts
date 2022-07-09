export interface Project {
    projectId: string,
    userIds: Array<string>
    rule: string,
    gatewayIds: Array<string>,
    structure: Array<string>
    industry: Array<String>
    website: string
    description: string,
    image: string,
    name: string
}

export interface Gateway{
    gatewayId: string,
    userIds: Array<string>,
    name: string
    type: string
    apiKey: string
    secondaryApiKey: string
    description: string
}

export interface Transaction{
    paymentId: string,
    amount: number,
    projectId: string,
    gatewayId: string,
    userIds: Array<string>,
    modified: string,
    created: string
}

export enum ItemTransactionGroupingItem {
    PROJECT, GATEWAY
}

export interface ItemTransactionPair{
    transactionList: Array<Transaction>
    total: number
}

export interface TransactionBreakdown{
    transactionMap: Map<string, ItemTransactionPair>, // pair <projectId/gatewayId> -> list of transactions and total
    groupedBy: ItemTransactionGroupingItem,
    total: number
}

export interface TransactionPercentageBreakdown extends Map<string, number>{} // pair pair <projectId/gatewayId> -> percent of total value

export interface ReportInputProps{
    selectedProject?: Project,
    selectedGateway?: Gateway,
    transactionList: Array<Transaction>
 }

export interface ReportFetchDTO{
    from: string,
    to: string,
    projectId?: string,
    gatewayId?: string
}

export interface ApiResultDataWrapper<T>{
    code: number,
    data: T,
    error: any
}

export interface ChartElement {
    id: string;
    name: string;
    value: number;
    backgroundColor?: string;
    color?: string;
}

export interface ChartData{
    title: string;
    type: ItemTransactionGroupingItem;
    data: ChartElement[];
}
