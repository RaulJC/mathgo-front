import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KidsComponent } from './kids.component';

const routes: Routes = [{ path: '', component: KidsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KidsRoutingModule { }
