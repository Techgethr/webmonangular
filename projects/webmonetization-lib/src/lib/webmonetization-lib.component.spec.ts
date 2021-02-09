import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebmonetizationLibComponent } from './webmonetization-lib.component';

describe('WebmonetizationLibComponent', () => {
  let component: WebmonetizationLibComponent;
  let fixture: ComponentFixture<WebmonetizationLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebmonetizationLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebmonetizationLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
