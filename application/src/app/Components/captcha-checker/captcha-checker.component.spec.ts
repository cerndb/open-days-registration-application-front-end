import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaCheckerComponent } from './captcha-checker.component';

describe('CaptchaCheckerComponent', () => {
  let component: CaptchaCheckerComponent;
  let fixture: ComponentFixture<CaptchaCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptchaCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
