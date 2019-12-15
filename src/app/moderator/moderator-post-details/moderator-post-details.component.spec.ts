import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorPostDetailsComponent } from './moderator-post-details.component';

describe('ModeratorPostDetailsComponent', () => {
  let component: ModeratorPostDetailsComponent;
  let fixture: ComponentFixture<ModeratorPostDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorPostDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
