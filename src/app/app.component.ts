/*
Original author: Syed Husain (syedhere.com)
Version: 1.0
Designed for: HackRice 2023
Copyright: Free for use but credit required
*/

import { Component } from '@angular/core';
import { SearchService } from './service/search.service';
import { makeModel, modelModel } from './models/make.model';
import { photosModel } from './models/photos.model';
import { of, from } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { emissionModel } from './models/emission.model';
import { lastValueFrom, timer } from 'rxjs';

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

  constructor(private _searchSrv: SearchService) { }

  ngOnInit() {
    this.clearAllArrays();
    this.getAllMakes();
    // this.makes.push("Honda", "Toyota", "Tesla")
  }

  getAllMakes() {
    //to be implemented
    this._searchSrv.getMakes().subscribe(
      {
        next: (response: makeModel) => {
          this.makes = response.data.map(currMake => currMake.make)
        },

        error: (error) => {
          console.log(error)
        }
      }
    )
  }

  onMakeSelect(event: any) {
    //to be implemented
    // at this point we know the make array is populated
    // populate the models

    // this.models
    this.selectedMake = event
    this.getAllModels(this.selectedMake)

  }

  getAllModels(make: string) {

    this._searchSrv.getModels(make).subscribe(
      {
        next: (response: modelModel) => {
          this.models = response.data.map(currModel => currModel.model)

          this.models = this.models.slice(0, 10);

          this.models.forEach(async model => {
            await this.getEmissions(model);
            await this.getPhotos(make, model);
          });
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }


  async getEmissions(model: string) {
    //to be implemented
    let make = this.selectedMake;
    this._searchSrv.getEmissions(make, model).subscribe(
      {
        next: async (response: emissionModel) => {
          this.emissions.push(response.data);
        }
      }
    )
  }

  getPhotos(make: string, model: string) {
    // Use timer to introduce a 1-second delay before making the API call
    timer(1500).subscribe(() => {
      this._searchSrv.getPhotos(make + " " + model).subscribe({
        next: (response: photosModel) => {
          this.photos.push(response.results[0].image);
        },
        error: (err) => {
          console.error(err);
        }
      });
    });
  }

  clearAllArrays() {
    this.models = [];
    this.emissions = [];
    this.photos = [];
    this.selectedMake = ""
  }
}
