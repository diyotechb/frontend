import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { CareersComponent } from './components/pages/careers/careers.component';
import { JobApplicationComponent } from './components/pages/job-application/job-application.component';


const routes: Routes = [
  {
    path:'',component:HomeComponent 
  },
  {
    path:'about',component:AboutComponent
  },
  {
    path:'contact-us',component:ContactComponent
  },
  {
    path:'services',component:ServicesComponent
  },
  {
    path:'careers',component:CareersComponent
  },
  {
    path:'apply',component:JobApplicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
