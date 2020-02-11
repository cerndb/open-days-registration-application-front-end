import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsSelectorComponent } from './visitors-selector.component';

describe('VisitorsSelectorComponent', () => {
  let component: VisitorsSelectorComponent;
  let fixture: ComponentFixture<VisitorsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
