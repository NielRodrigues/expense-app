import { Injectable } from '@nestjs/common';
import { data, ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {

  constructor(private readonly reportService: ReportService) {}

  calculateSummary(){

    const totalExpense: number = this.reportService.getAllReports(ReportType.EXPENSE).reduce((sum, report) => sum + report.amount, 0)
    const totalIncome: number = this.reportService.getAllReports(ReportType.INCOME).reduce((sum, report) => sum + report.amount, 0)


    const allReports = data.report

    return [{
      totalIncome: `R$ ${String(totalIncome.toFixed(2)).replace(".", ",")}`,
      totalExpense: `R$ ${String(totalExpense.toFixed(2)).replace(".", ",")}`,
      netInocme: `R$ ${String((totalIncome - totalExpense).toFixed(2)).replace(".", ",")}`,
    },
  
    {
      allReports
    }
  
    ]
  }
}
