import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  dataUser = {
    email: 'rodrigo@gmail.com',
    password: '123123'
  };

  isSubmited = false;
  loginFormGroup = new FormGroup({
    email: new FormControl('rodrigo@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('123123', [Validators.required, Validators.minLength(6)])
  });
  show: boolean = false;
  constructor(private usuarioService: UsuariosService,
              private router: Router,
              public alertController: AlertController
             ) { }

  async login(flogin: NgForm) {
    this.isSubmited = true;
    if (flogin.invalid) { return; };
    if (this.loginFormGroup.controls.email.value !== this.dataUser.email ||
         this.loginFormGroup.controls.password.value !== this.dataUser.password) {
          this.presentAlert();
    } else {
      await this.usuarioService.login();
    }

    /*console.log(isvalid);
     if (isvalid) {
      await this.router.navigate(['/home', { animated: true }]);
    } else {
      this.presentAlert();
    } */

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Email or Password invalids',
      message: 'Please verify the data.',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  changeVisibility(){
    console.log('first;');
    this.show = !this.show;
  }

}
