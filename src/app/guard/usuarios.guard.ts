import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosGuard implements CanLoad {
  constructor(private usuarioService: UsuariosService){}

canLoad(): Observable<boolean> | Promise<boolean> | boolean {
return this.usuarioService.validaToken();
}

}
