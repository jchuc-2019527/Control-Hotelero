import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorfilComponent } from './porfil.component';

describe('PorfilComponent', () => {
  let component: PorfilComponent;
  let fixture: ComponentFixture<PorfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
