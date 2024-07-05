import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionSessionComponent } from './revisionSession.component';

describe('RevisionSessionComponent', () => {
  let component: RevisionSessionComponent;
  let fixture: ComponentFixture<RevisionSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
