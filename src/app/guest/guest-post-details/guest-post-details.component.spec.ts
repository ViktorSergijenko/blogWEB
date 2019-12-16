import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestPostDetailsComponent } from './guest-post-details.component';

describe('GuestPostDetailsComponent', () => {
  let component: GuestPostDetailsComponent;
  let fixture: ComponentFixture<GuestPostDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestPostDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
