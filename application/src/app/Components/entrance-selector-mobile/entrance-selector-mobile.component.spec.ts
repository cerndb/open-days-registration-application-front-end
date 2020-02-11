import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceSelectorMobileComponent } from './entrance-selector-mobile.component';

describe('EntranceSelectorMobileComponent', () => {
  let component: EntranceSelectorMobileComponent;
  let fixture: ComponentFixture<EntranceSelectorMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntranceSelectorMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceSelectorMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
