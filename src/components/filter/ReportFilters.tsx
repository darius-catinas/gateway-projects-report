import React, { useMemo } from 'react'
import Filter from './Filter';
import CalendarFilter from './CalendarFilter';
import './Filter.css';
import { ReactComponent as ChevronDownIcon } from '../../assets/filter/down-icon.svg'
import { ReactComponent as CalendarIcon } from '../../assets/filter/calendar.svg'
import { Gateway, Project } from '../../common/interfaces';

interface ReportFiltersInterface{
  projectList: Array<Project>,
  gatewayList: Array<Gateway>,
  onSelectProject: (_?: Project) => void,
  onSelectGateway: (_?: Gateway) => void,
  onSelectFromDate: (_: string) => void,
  onSelectToDate: (_ : string) => void,
  onGenerateReport: () => void,
  selectedProject?: Project,
  selectedGateway?: Gateway

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
  onGenerateReport, onSelectGateway,
  onSelectProject, selectedProject,
  selectedGateway, onSelectFromDate,
  onSelectToDate }: ReportFiltersInterface) => {
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

  const selectGateway = (id?: string) => {
    if (id) {
      const currentGateway = gatewayList.filter(g => g.gatewayId === id)[0];
      onSelectGateway(currentGateway);
    } else { onSelectGateway(undefined); }
  }

  const selectProject = (id?: string) => {
    if (id) {
      const currentProject = projectList.filter(p => p.projectId === id)[0];
      onSelectProject(currentProject);
    } else { onSelectProject(undefined); }
  }

  return (
    <div className="filter-container">
      <Filter
        key="project"
        options={projectOptions}
        selectedOption={mapProjectToFilterOption(selectedProject)}
        onSelect={selectProject}
        expandIcon={<ChevronDownIcon className="h-3 w-3" aria-hidden="true" />}
      />
      <Filter
        key="gateway"
        options={gatewayOptions}
        selectedOption={mapGatewayToFilterOption(selectedGateway)}
        onSelect={selectGateway}
        expandIcon={<ChevronDownIcon className="h-3 w-3" aria-hidden="true" />}
      />
      <CalendarFilter
        key="fromDate"
        dateText="From date"
        onSelectDate={onSelectFromDate}
        showDate={firstDate}
        expandIcon={<CalendarIcon className="h-3 w-3" aria-hidden="true" />}
      />
      <CalendarFilter
        key="toDate"
        dateText="To date"
        onSelectDate={onSelectToDate}
        showDate={lastDate}
        expandIcon={<CalendarIcon className="h-3 w-3" aria-hidden="true" />}
      />
      <GenerateReportButton onPress={onGenerateReport} />
    </div>
  )
}

export default ReportFilters;
