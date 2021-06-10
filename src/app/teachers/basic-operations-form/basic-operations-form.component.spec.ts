import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicOperationsFormComponent } from './basic-operations-form.component';

describe('BasicOperationsFormComponent', () => {
  let component: BasicOperationsFormComponent;
  let fixture: ComponentFixture<BasicOperationsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicOperationsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicOperationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
