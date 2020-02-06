import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTestPageComponent } from './default-test-page.component';

describe('DefaultTestPageComponent', () => {
  let component: DefaultTestPageComponent;
  let fixture: ComponentFixture<DefaultTestPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultTestPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
