import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { EnvService } from './common/services/env-service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProgressSpinnerModule

  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (envService: EnvService) => () => envService.init(),
    deps: [EnvService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
