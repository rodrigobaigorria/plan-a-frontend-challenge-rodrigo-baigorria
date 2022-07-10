import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from '../../environments/environment';


const URL = environment.URL;
const API = environment.API_KEY;
const USER = environment.USERNAME;
const PASS = environment.PASSWORD

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  token: string = null;

  constructor(private http: HttpClient,
              private navCtrl: NavController) { }

  login() {

    return new Promise(resolve => {
      this.http.get(`${URL}/authentication/token/new?api_key=${API}`)
        .subscribe(resp => {
          console.log(resp);
          const body = {
            username: USER,
            password: PASS,
            request_token: resp['request_token']
          }
          this.http.post(`${URL}/authentication/token/validate_with_login?api_key=${API}`, body)
          .subscribe(res => {
            console.log(res);
            if (resp['success']) {
              this.guardarToken(res['request_token']);
              resolve(true);
              this.navCtrl.navigateRoot('/home');
            } else {
              this.token = null;
              resolve(false)
            }
          })
      })
    })

  }

  async guardarToken(token: string) {
    this.token = token;
    await localStorage.setItem('token', token);

  }

  async cargarToken(){
    this.token = await localStorage.getItem('token') || null;
  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if( !this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }else {
      return Promise.resolve(true);
    }
   }

}
