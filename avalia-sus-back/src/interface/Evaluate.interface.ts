export interface Evaluate {
  userId: string
  hospitalId: string
  comment: string
  rate: number
}

export interface UpdateEvaluate {
  userId: string
  comment: string
  rate: number
}