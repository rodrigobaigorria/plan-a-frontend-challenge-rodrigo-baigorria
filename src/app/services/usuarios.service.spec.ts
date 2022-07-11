import { UsuariosService } from './usuarios.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../environments/environment.prod';

const URL = environment.URL;
const API = environment.API_KEY;

const dataLogin =
  {
    expires_at: '',
    request_token: '',
    success: true
	};

describe('UsuarioService', () => {

  let service: UsuariosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers:[
        UsuariosService
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(UsuariosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* async login() {
    await this.http.get(`${URL}/authentication/token/new?api_key=${API}`)
      .subscribe(resp => {
        console.log(resp);
        this.getToken(resp);
    });
}*/

it('login function return an boolean if a promise are resolve', () => {
  service.login().then((resp: any) => {
    expect(resp).toEqual(dataLogin);
  });
  const req = httpMock.expectOne(`${URL}/authentication/token/new?api_key=${API}`);
  expect(req.flush).toBeTruthy();
})

});
