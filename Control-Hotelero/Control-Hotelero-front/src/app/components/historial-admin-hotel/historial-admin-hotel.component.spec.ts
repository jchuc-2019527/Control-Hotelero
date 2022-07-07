import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAdminHotelComponent } from './historial-admin-hotel.component';

describe('HistorialAdminHotelComponent', () => {
  let component: HistorialAdminHotelComponent;
  let fixture: ComponentFixture<HistorialAdminHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialAdminHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAdminHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
