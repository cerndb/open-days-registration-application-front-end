import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsDetailPageComponent } from './visitors-detail-page.component';

describe('VisitorsDetailPageComponent', () => {
  let component: VisitorsDetailPageComponent;
  let fixture: ComponentFixture<VisitorsDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorsDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
