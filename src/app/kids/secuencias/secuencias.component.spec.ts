import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuenciasComponent } from './secuencias.component';

describe('SecuenciasComponent', () => {
  let component: SecuenciasComponent;
  let fixture: ComponentFixture<SecuenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecuenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
