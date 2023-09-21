/*
Original author: Syed Husain (syedhere.com)
Version: 1.0
Designed for: HackRice 2023
Copyright: Free for use but credit required
*/

import { Component } from '@angular/core';
import { SearchService } from './service/search.service';
import { makeModel } from './models/make.model';
import { photosModel } from './models/photos.model';
import { of, from } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'carbon-tracker';
  makes: any[] = [];
  models: any[] = [];
  emissions: any[] = [];
  photos: any[] = [];
  selectedMake?: any;

  constructor(private _searchSrv: SearchService) {}

  ngOnInit() {
    this.models = [];
    // this.getAllMakes();
    this.makes.push("Honda", "Toyota", "Tesla")
  }

  getAllMakes() {
    //to be implemented
  }

  onMakeSelect(event: any) {
    //to be implemented
  }

  getAllModels(make: string) {
    //to be implemented

    this.models.push('Model 3', 'Model S', 'Model X', 'Model Y', 'Roadster');
    this.getPhotos(this.selectedMake, this.models);
  }

  getEmissions(models: any[]) {
    //to be implemented
    this.getPhotos(this.selectedMake, models);
  }

  getPhotos(make: any, models: any[]) {
    // Convert models array to observable
    from(models).pipe(
      // Add delay of 50ms between each call
      concatMap(model => of(model).pipe(delay(200))),
      // Make API call for each model
      concatMap(model => this._searchSrv.getPhotos(make + ' ' + model))
    ).subscribe((data: photosModel) => {
      this.photos.push(data.results[0].image);
    });
  }
}
