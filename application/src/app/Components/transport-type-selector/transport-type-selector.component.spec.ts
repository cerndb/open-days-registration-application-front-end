import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTypeSelectorComponent } from './transport-type-selector.component';

describe('TransportTypeSelectorComponent', () => {
  let component: TransportTypeSelectorComponent;
  let fixture: ComponentFixture<TransportTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
