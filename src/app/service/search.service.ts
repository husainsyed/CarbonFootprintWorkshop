import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { makeModel, modelModel } from '../models/make.model';
import { emissionModel } from '../models/emission.model';
import { photosModel } from '../models/photos.model';


// an object named API_HEADERS contains 3 properties:
// the api key which is my personal encrptyed key like a password for example
// the api host which is where should we access this api
// and the query string which allows to pass urls

const API_KEY = "XYZ123"

const API_HEADERS = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'carbonsutra1.p.rapidapi.com',
  useQueryString: 'true',
};

const DUCKDUCKGOAPI_HEADERS = {
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'duckduckgo-image-search.p.rapidapi.com',
};

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // the bodyPart variable uses the bodyPartModel from the model
  // also the constructor uses http for a remote api
  // then there is a getBodyPartList method which requires a bodyPart and uses
  // the API_HEADERS and the API_URL which is the url for the api
  // it then returns the other values associated in the bodyPartModel

  makeModel?: makeModel;
  emissionModel?: emissionModel;
  photosModel?: photosModel;

  constructor(private http: HttpClient) { }

  getMakes(): Observable<makeModel> {
    const headers = new HttpHeaders(API_HEADERS);
    const API_URL = `https://carbonsutra1.p.rapidapi.com/vehicle_makes`;
    return this.http.get<makeModel>(API_URL, { headers });
  }

  getModels(make: string): Observable<modelModel> {
    const headers = new HttpHeaders(API_HEADERS);
    const API_URL = `https://carbonsutra1.p.rapidapi.com/vehicle_makes/${make}/vehicle_models`;
    return this.http.get<modelModel>(API_URL, { headers });
  }

  getEmissions(make: string, model: string): Observable<emissionModel> {
    //make a post call to https://carbonsutra1.p.rapidapi.com/vehicle_estimate_by_model
    //with the following body: vehicle_make, vehicle_model, distance_value, distance_unit

    const headers = new HttpHeaders(API_HEADERS);
    const API_URL = `https://carbonsutra1.p.rapidapi.com/vehicle_estimate_by_model`;
    const body = {
      vehicle_make: make,
      vehicle_model: model,
      distance_value: '1',
      distance_unit: 'mi',
    };

    return this.http.post<emissionModel>(API_URL, body, { headers });
  }


  getPhotos(query: string): Observable<photosModel> {
    //make a get call to https://duckduckgo-image-search.p.rapidapi.com/search/image with params: q
    //and headers: x-rapidapi-key, x-rapidapi-host, useQueryString

    const headers = new HttpHeaders(DUCKDUCKGOAPI_HEADERS);
    const API_URL = `https://duckduckgo-image-search.p.rapidapi.com/search/image?q=${query}`;
    return this.http.get<photosModel>(API_URL, { headers });
  }
}
