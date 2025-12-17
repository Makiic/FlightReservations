import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlightComponent } from './admin-flight.component';

describe('AdminFlightComponent', () => {
  let component: AdminFlightComponent;
  let fixture: ComponentFixture<AdminFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFlightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
