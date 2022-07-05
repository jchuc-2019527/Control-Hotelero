import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHotelsComponent } from './info-hotels.component';

describe('InfoHotelsComponent', () => {
  let component: InfoHotelsComponent;
  let fixture: ComponentFixture<InfoHotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoHotelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
