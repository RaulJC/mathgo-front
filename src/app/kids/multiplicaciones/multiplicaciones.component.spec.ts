import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplicacionesComponent } from './multiplicaciones.component';

describe('MultiplicacionesComponent', () => {
  let component: MultiplicacionesComponent;
  let fixture: ComponentFixture<MultiplicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplicacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
