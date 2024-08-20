export interface emissionModel {
  data: Data
  success: boolean
  status: number
}

export interface Data {
  type: string
  distance_unit: string
  distance_value: string
  vehicle_make: string
  vehicle_model: string
  co2e_gm: number
  co2e_kg: number
  co2e_mt: number
  co2e_lb: number
}
