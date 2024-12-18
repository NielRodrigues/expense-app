import { Injectable } from "@nestjs/common";
import { ReportType, data } from "src/data";
import { v4 as uuid } from "uuid";
import { ReportResponseDto } from "../dtos/report.dto";

interface ReportData { amount: number, source: string }
interface UpdateReport { amount?: number, source?: string }

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report.filter((report) => report.type === type).map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report.filter((report) => report.type === type).find((report) => report.id === id)

    if (!report) return

    return new ReportResponseDto(report)
  }

  createReport(type: ReportType, { amount, source }: ReportData): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    }

    data.report.push(newReport)

    return new ReportResponseDto(newReport)
  }

  updateReport(type: ReportType, id: string, { amount, source }: UpdateReport): ReportResponseDto | { error: string, message: string } {
    const reportToUpdate = data.report.filter((report) => report.type === type).find((reportType) => reportType.id === id)

    if (!reportToUpdate) {
      return {
        error: "404",
        message: "Report doesn't exist"
      }
    }

    const reportIndex = data.report.findIndex((report) => report.id === id)

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      amount,
      source,
      updated_at: new Date()
    }

    return new ReportResponseDto(data.report[reportIndex])
  }

  deleteReport(id: string) {
    const reportToUpdate = data.report.findIndex((report) => report.id === id)

    if (reportToUpdate === -1) {
      return {
        status: 404,
        message: "Report doesn't exist"
      }
    }

    data.report.splice(reportToUpdate, 1)

    return {
      status: 204,
      message: "Report has been deleted"
    }
  }
}