import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularUserPostDetailsComponent } from './regular-user-post-details.component';

describe('RegularUserPostDetailsComponent', () => {
  let component: RegularUserPostDetailsComponent;
  let fixture: ComponentFixture<RegularUserPostDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularUserPostDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularUserPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
