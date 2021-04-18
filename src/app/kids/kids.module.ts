import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KidsRoutingModule } from './kids-routing.module';
import { KidsComponent } from './kids.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { SumasComponent } from './sumas/sumas.component';
import { ProblemasComponent } from './problemas/problemas.component';
import { CoreModule } from '../core/core.module';
import { RestasComponent } from './restas/restas.component';
import { MultiplicacionesComponent } from './multiplicaciones/multiplicaciones.component';
import { SecuenciasComponent } from './secuencias/secuencias.component';
import { DivisionesComponent } from './divisiones/divisiones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [KidsComponent, PuzzleComponent, SumasComponent, ProblemasComponent, RestasComponent, MultiplicacionesComponent, SecuenciasComponent, DivisionesComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    KidsRoutingModule
  ]
})
export class KidsModule { }
