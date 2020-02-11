import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFastTrackLhcDialogComponent } from './no-fast-track-lhc-dialog.component';

describe('NoFastTrackLhcDialogComponent', () => {
  let component: NoFastTrackLhcDialogComponent;
  let fixture: ComponentFixture<NoFastTrackLhcDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoFastTrackLhcDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFastTrackLhcDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
