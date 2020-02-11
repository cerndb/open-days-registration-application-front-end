import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceSelectorComponent } from './entrance-selector.component';

describe('EntranceSelectorComponent', () => {
  let component: EntranceSelectorComponent;
  let fixture: ComponentFixture<EntranceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntranceSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
