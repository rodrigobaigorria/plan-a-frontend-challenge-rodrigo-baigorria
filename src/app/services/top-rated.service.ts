import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

const URL = environment.URL;
const API = environment.API_KEY;

@Injectable({
  providedIn: 'root'
})
export class TopRatedService {

  constructor(private http: HttpClient) { }


  getTop() {
    return this.http.get(`${URL}/movie/top_rated?api_key=${API}&language=en-US&page=1`);
  }

}
