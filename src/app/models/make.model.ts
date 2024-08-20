export interface makeModel {
  data: Daum[]
  success: boolean
  status: number
}

export interface Daum {
  make: string
  number_of_models: number
}

export interface modelInterface {
  model: string
}

export interface modelModel {
  data: modelInterface[]
  success: boolean
  status: number

}
