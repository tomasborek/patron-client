export interface IResponse<T = object> {
  meta: {
    date: Date
    status: number
    message: string
    pagination?: {
      page: number
    }
  }
  data?: T
}
