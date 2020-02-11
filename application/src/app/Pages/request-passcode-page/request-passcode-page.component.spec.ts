import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPasscodePageComponent } from './request-passcode-page.component';

describe('RequestPasscodePageComponent', () => {
  let component: RequestPasscodePageComponent;
  let fixture: ComponentFixture<RequestPasscodePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPasscodePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPasscodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
