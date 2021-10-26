import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/container/home-page/home-page.component';
import { ContainerComponent } from './pages/container/container.component';
import { TopbarComponent } from './component/topbar/topbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContainerComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
