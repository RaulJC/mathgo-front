import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestasComponent } from './restas.component';

describe('RestasComponent', () => {
  let component: RestasComponent;
  let fixture: ComponentFixture<RestasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
