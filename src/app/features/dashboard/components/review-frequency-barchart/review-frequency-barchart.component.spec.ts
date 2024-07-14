import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFrequencyBarchartComponent } from './review-frequency-barchart.component';

describe('ReviewFrequencyBarchartComponent', () => {
  let component: ReviewFrequencyBarchartComponent;
  let fixture: ComponentFixture<ReviewFrequencyBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewFrequencyBarchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewFrequencyBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
