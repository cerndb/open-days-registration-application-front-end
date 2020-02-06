import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVisitorDetailsComponent } from './update-visitor-details.component';

describe('UpdateVisitorDetailsComponent', () => {
  let component: UpdateVisitorDetailsComponent;
  let fixture: ComponentFixture<UpdateVisitorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVisitorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVisitorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
