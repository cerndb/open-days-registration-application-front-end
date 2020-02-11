import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTransportTypeComponent } from './update-transport-type.component';

describe('UpdateTransportTypeComponent', () => {
  let component: UpdateTransportTypeComponent;
  let fixture: ComponentFixture<UpdateTransportTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTransportTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTransportTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
