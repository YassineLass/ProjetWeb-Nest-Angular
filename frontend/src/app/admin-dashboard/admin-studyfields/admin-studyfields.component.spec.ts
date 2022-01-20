import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudyfieldsComponent } from './admin-studyfields.component';

describe('AdminStudyfieldsComponent', () => {
  let component: AdminStudyfieldsComponent;
  let fixture: ComponentFixture<AdminStudyfieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStudyfieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudyfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
