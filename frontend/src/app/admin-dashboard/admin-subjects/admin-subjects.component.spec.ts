import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubjectsComponent } from './admin-subjects.component';

describe('AdminSubjectsComponent', () => {
  let component: AdminSubjectsComponent;
  let fixture: ComponentFixture<AdminSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
