import { Injectable, Inject, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location, Review } from './location';
import { environment } from '../environments/environment';
<<<<<<< HEAD
import { User } from './user';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';
=======
>>>>>>> parent of 9ef75f2 (added auth for frontend)

@Injectable({
  providedIn: 'root'
})
export class Loc8rDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  private apiBaseUrl = environment.apiBaseUrl;

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    // const lng: number = -0.7992599;
    // const lat: number = 51.378091;
    const maxDistance: number = 20;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location[])
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong:', error);
    return Promise.reject(error.message || error);
  }
  
  public getLocationById(locationId: string): Promise<Location[]> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location)
      .catch(this.handleError)
  }

  public addReviewByLocationId(locationId: string, formData: Review): Promise<Review>{
    const url: string = `${this.apiBaseUrl}/locations/${locationId}/reviews`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('loc8r-token')}`
      })
    }
    return this.http
      .post(url, formData)
      .toPromise()
      .then(response => response as Review)
      .catch(this.handleError);
  }
}
