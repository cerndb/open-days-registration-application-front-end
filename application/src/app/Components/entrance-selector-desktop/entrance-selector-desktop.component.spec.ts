import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceSelectorDesktopComponent } from './entrance-selector-desktop.component';

describe('EntranceSelectorDesktopComponent', () => {
  let component: EntranceSelectorDesktopComponent;
  let fixture: ComponentFixture<EntranceSelectorDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntranceSelectorDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceSelectorDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
