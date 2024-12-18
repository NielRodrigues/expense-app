export interface Data {
  report: {
    id: string,
    source: string,
    amount: number,
    created_at: Date,
    updated_at: Date,
    type: ReportType,
  }[] 
}

export enum ReportType {
  INCOME = "income",
  EXPENSE = "expense"
}

export const data: Data = {
  report: [
    {
      id: "uuid1",
      source: "salary",
      amount: 1612.90,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: "uuid2",
      source: "gym",
      amount: 120,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE,
    },
  ]
}

export const dados = {
  reports: []
}

console.log(data)