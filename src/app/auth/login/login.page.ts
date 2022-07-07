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

  isSubmited = false;
  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private usuarioService: UsuariosService,
              private router: Router,
              public alertController: AlertController
             ) { }

  async login(flogin: NgForm) {
    this.isSubmited = true;
    if (flogin.invalid) { return; }

    const isvalid = await this.usuarioService.login();
    console.log(isvalid);
    if (isvalid) {
      await this.router.navigate(['/home', { animated: true }]);
    } else {
      this.presentAlert();
    }

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

}
