import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmpleadoComponent } from './new-empleado.component';

describe('NewEmpleadoComponent', () => {
  let component: NewEmpleadoComponent;
  let fixture: ComponentFixture<NewEmpleadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewEmpleadoComponent]
    });
    fixture = TestBed.createComponent(NewEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
