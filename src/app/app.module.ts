import { NgModule, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/container/home-page/home-page.component';
import { ContainerComponent } from './pages/container/container.component';
import { TopbarComponent } from './component/topbar/topbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NewsComponent } from './pages/container/news/news.component';
import { ProfileComponent } from './pages/container/profile/profile.component';
import { LayoutModule } from './share/layout/layout.module';
import { TeamsComponent } from './pages/container/teams/teams.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FooterComponent } from './component/footer/footer.component';
import { DialogTeamComponent } from './pages/container/teams/dialog-team/dialog-team.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContainerComponent,
    TopbarComponent,
    NewsComponent,
    ProfileComponent,
    TeamsComponent,
    FooterComponent,
    DialogTeamComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
