import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { CodigoComponent } from './codigo/codigo.component';
import { GeneradorComponent } from './generador/generador.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { CoreModule } from '../core/core.module';
import { FormularioSecuenciasComponent } from './formulario-secuencias/formulario-secuencias.component';

@NgModule({
  declarations: [TeachersComponent, CodigoComponent, GeneradorComponent, FormularioSecuenciasComponent],
  imports: [
    CommonModule,
    CoreModule,
    TeachersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CodemirrorModule,
  ]
})
export class TeachersModule { }
