import { Injectable } from "@angular/core";

export enum Environment {
  Local = 'local',
  Prod = 'prod',
  Sit = 'sit',
  Qa = 'qa',
  Uat = 'uat',
}

@Injectable({ providedIn: 'root' })
export class EnvService {
  private _env: Environment;
  private _apiUrl: string;

  get env(): Environment {
    return this._env;
  }

  get apiUrl(): string {
    return this._apiUrl;
  }

  constructor() {}

  init(): Promise<void> {
    return new Promise(resolve => {
      this.setEnvVariables();
      resolve();
    });
  }

  private setEnvVariables(): void {
    const hostname = window && window.location && window.location.host;

    if (/^.*localhost.*/.test(hostname) ) {
      this._env = Environment.Local;
      this._apiUrl = 'http://localhost:9090/';
      sessionStorage.setItem("baseUrl", '');
      sessionStorage.setItem("imdAuthUrl", 'http://localhost:8080/');
      sessionStorage.setItem("imdProdUrl", 'http://localhost:8090/');
      sessionStorage.setItem("imdOtpUrl", 'http://localhost:8110/');
      sessionStorage.setItem("imdFeedbUrl", 'http://localhost:8100/');
    } else {
      this._env = Environment.Local;
      this._apiUrl = 'http://localhost:9090/';
      sessionStorage.setItem("baseUrl", 'http://103.163.204.80:8080/');
      sessionStorage.setItem("imdAuthUrl", 'auth-service1/');
      sessionStorage.setItem("imdProdUrl", 'product-service/');
      sessionStorage.setItem("imdOtpUrl", 'otp-service/');
      sessionStorage.setItem("imdFeedbUrl", 'feedback-service/');
    } 
  }
}
