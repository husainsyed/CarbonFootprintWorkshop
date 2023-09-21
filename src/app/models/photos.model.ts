export interface photosModel {
    ads: any
    next: string
    query: string
    queryEncoded: string
    response_type: string
    results: Result[]
  }
  
  export interface Result {
    height: number
    image: string
    image_token: string
    source: string
    thumbnail: string
    thumbnail_token: string
    title: string
    url: string
    width: number
  }
  