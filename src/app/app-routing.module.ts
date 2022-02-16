import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilterComponent } from './components/filter/filter.component';
import { ResultComponent } from './components/result/result.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: 'filter', component: FilterComponent },
  { path: 'result', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
