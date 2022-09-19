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

    if (/^.*localhost.*/.test(hostname)) {
      this._env = Environment.Local;
      this._apiUrl = 'http://localhost:9090/';
      sessionStorage.setItem("baseUrl", 'http://localhost:9090/');
    }
    else if (/oci-uatcommissionportal.acsicorp.com/.test(hostname)) {
      this._env = Environment.Uat;
      this._apiUrl = 'https://oci-trun-poc2.acsicorp.com/services/cp/';
      sessionStorage.setItem("baseUrl", 'https://oci-trun-poc2.acsicorp.com/services/cp/');
    } else if (/oci-qacommissionportal.acsicorp.com/.test(hostname)) {
      this._env = Environment.Qa;
      this._apiUrl = 'https://oci-trun-poc1.acsicorp.com/services/cp/';
      sessionStorage.setItem("baseUrl", 'https://oci-trun-poc1.acsicorp.com/services/cp/');
    } else if (/oci-sitcommissionportal.acsicorp.com/.test(hostname)) {
      this._env = Environment.Sit;
      this._apiUrl = 'https://oci-trun-poc.acsicorp.com/services/cp/';
      sessionStorage.setItem("baseUrl", 'https://oci-trun-poc.acsicorp.com/services/cp/');
    } else if (/commissionportal.acsicorp.com/.test(hostname)) {
      this._env = Environment.Prod;
      this._apiUrl = 'https://prodtrun711.acsicorp.com/services/cp/';
      sessionStorage.setItem("baseUrl", 'https://prodtrun711.acsicorp.com/services/cp/');
    } else {
      console.warn(`Cannot find environment for host name ${hostname}`);
    }
  }
}
