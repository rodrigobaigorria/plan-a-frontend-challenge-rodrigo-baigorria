import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const URL = environment.URL;
const API = environment.API_KEY;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  movies = [];

  constructor(private router: Router,
              private http: HttpClient) {}

  ngOnInit() {
    this.http.get(`${URL}/movie/latest?api_key=${API}&language=en-US&include_image_language=en`)
    .subscribe(resp => {
      console.log(resp);
      this.movies.push(resp);
      console.log(this.movies);
    })
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
