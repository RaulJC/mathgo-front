import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KidsRoutingModule } from './kids-routing.module';
import { KidsComponent } from './kids.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { SumasComponent } from './sumas/sumas.component';
import { ProblemasComponent } from './problemas/problemas.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [KidsComponent, PuzzleComponent, SumasComponent, ProblemasComponent],
  imports: [
    CommonModule,
    CoreModule,
    KidsRoutingModule
  ]
})
export class KidsModule { }
