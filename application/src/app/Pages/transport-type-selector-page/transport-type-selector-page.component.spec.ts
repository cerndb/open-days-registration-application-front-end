import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportTypeSelectorPageComponent } from './transport-type-selector-page.component';

describe('TransportTypeSelectorPageComponent', () => {
  let component: TransportTypeSelectorPageComponent;
  let fixture: ComponentFixture<TransportTypeSelectorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportTypeSelectorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportTypeSelectorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
