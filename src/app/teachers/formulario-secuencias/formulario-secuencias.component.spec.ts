import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioSecuenciasComponent } from './formulario-secuencias.component';

describe('FormularioSecuenciasComponent', () => {
  let component: FormularioSecuenciasComponent;
  let fixture: ComponentFixture<FormularioSecuenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioSecuenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioSecuenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
