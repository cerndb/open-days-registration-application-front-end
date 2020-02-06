import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTokenPageComponent } from './request-token-page.component';

describe('RequestTokenPageComponent', () => {
  let component: RequestTokenPageComponent;
  let fixture: ComponentFixture<RequestTokenPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTokenPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTokenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
