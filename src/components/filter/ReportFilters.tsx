import React, { useMemo } from 'react'
import Filter from './Filter';
import CalendarFilter from './CalendarFilter';
import './Filter.css';
import { ReactComponent as ChevronDownIcon } from '../../assets/filter/down-icon.svg'
import { ReactComponent as CalendarIcon } from '../../assets/filter/calendar.svg'
import { Gateway, Project } from '../../common/interfaces';

export interface ReportGenerateProps{
  selectedProject: Project | undefined,
  selectedGateway: Gateway | undefined,
  fromDate: string,
  toDate: string
}

interface ReportFiltersInterface{
  projectList: Array<Project>,
  gatewayList: Array<Gateway>,
  onGenerateReport: (_ :ReportGenerateProps) => void,

}

interface GenerateReportProps{
  onPress: () => void
}

const mapProjectToFilterOption = (project?: Project) => {
  if (project === undefined) {
    return { id: undefined, displayValue: 'All projects' }
  }
  return { id: project.projectId, displayValue: project.name }
}

const mapGatewayToFilterOption = (gateway?: Gateway) => {
  if (gateway === undefined) {
    return { id: undefined, displayValue: 'All gateways' }
  }
  return { id: gateway.gatewayId, displayValue: gateway.name }
}

const GenerateReportButton = ({ onPress }: GenerateReportProps) => {
  return (
    <div onClick={onPress} className="report-button border-gray-300 border shadow-sm flex justify-center items-center">
      <span>
        Generate report
      </span>
    </div>
  )
}

const firstDate = new Date('2021-01-01')
const lastDate = new Date('2021-12-31')

const ReportFilters: React.FC<ReportFiltersInterface> =
({ projectList, gatewayList,
  onGenerateReport }: ReportFiltersInterface) => {
  const [selectedProject, selectProject] = React.useState<Project | undefined>(undefined);
  const [selectedGateway, selectGateway] = React.useState<Gateway | undefined>(undefined);
  const [fromDate, setFromDate] = React.useState<string>('2021-01-01');
  const [toDate, setToDate] = React.useState<string>('2021-12-31');

  const mapProjectOptions = () => {
    const projectOptions = projectList.map(p => ({ id: p.projectId, displayValue: p.name }))
    return [{ id: undefined, displayValue: 'All projects' }, ...projectOptions]
  }
  const mapGatewayOptions = () => {
    const gatewayOptions = gatewayList.map(g => ({ id: g.gatewayId, displayValue: g.name }))
    return [{ id: undefined, displayValue: 'All gateways' }, ...gatewayOptions]
  }

  const projectOptions = useMemo(() => {
    return mapProjectOptions()
  }, [projectList]);

  const gatewayOptions = useMemo(() => {
    return mapGatewayOptions()
  }, [gatewayList]);

  const selectGatewayId = (id?: string) => {
    if (id) {
      const currentGateway = gatewayList.filter(g => g.gatewayId === id)[0];
      selectGateway(currentGateway);
    } else { selectGateway(undefined); }
  }

  const selectProjectId = (id?: string) => {
    if (id) {
      const currentProject = projectList.filter(p => p.projectId === id)[0];
      selectProject(currentProject);
    } else { selectProject(undefined); }
  }

  const onGenerateReportPress = () => {
    onGenerateReport({ selectedGateway, selectedProject, fromDate, toDate })
  }

  return (
    <div className="filter-container">
      <Filter
        key="project"
        options={projectOptions}
        selectedOption={mapProjectToFilterOption(selectedProject)}
        onSelect={selectProjectId}
        expandIcon={<ChevronDownIcon className="h-3 w-3" aria-hidden="true" />}
      />
      <Filter
        key="gateway"
        options={gatewayOptions}
        selectedOption={mapGatewayToFilterOption(selectedGateway)}
        onSelect={selectGatewayId}
        expandIcon={<ChevronDownIcon className="h-3 w-3" aria-hidden="true" />}
      />
      <CalendarFilter
        key="fromDate"
        dateText="From date"
        onSelectDate={setFromDate}
        showDate={firstDate}
        expandIcon={<CalendarIcon className="h-3 w-3" aria-hidden="true" />}
      />
      <CalendarFilter
        key="toDate"
        dateText="To date"
        onSelectDate={setToDate}
        showDate={lastDate}
        expandIcon={<CalendarIcon className="h-3 w-3" aria-hidden="true" />}
      />
      <GenerateReportButton onPress={onGenerateReportPress} />
    </div>
  )
}

export default ReportFilters;
