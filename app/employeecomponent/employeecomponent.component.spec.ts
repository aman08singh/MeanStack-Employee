import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeecomponentComponent } from './employeecomponent.component';

describe('EmployeecomponentComponent', () => {
  let component: EmployeecomponentComponent;
  let fixture: ComponentFixture<EmployeecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
