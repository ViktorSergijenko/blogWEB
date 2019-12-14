import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularUserDashboardComponent } from './regular-user-dashboard.component';

describe('RegularUserDashboardComponent', () => {
  let component: RegularUserDashboardComponent;
  let fixture: ComponentFixture<RegularUserDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularUserDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
