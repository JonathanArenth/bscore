import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContainerComponent } from './pages/container/container.component';

const routes: Routes = [
  {path:'home-page', component: ContainerComponent},
  {path: 'news', component: ContainerComponent},
  {path: 'profil', component: ContainerComponent},
  {path: 'teams', component: ContainerComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
