import { formatPrice } from '../../../common/format';

interface ReportTotalProps{
    total: number
}
const ReportTotal = ({ total }: ReportTotalProps) => {
  return (
    <div className="report-total">
      <div className="flex items-center justify-center w-64">
        {formatPrice(total)}
      </div>
    </div>
  )
}

export default ReportTotal;
