export interface emissionModel {
    data: Data
    success: boolean
    status: number
  }
  
  export interface Data {
    co2e_gm: number
    co2e_kg: number
    co2e_mt: number
    co2e_lb: number
  }
  