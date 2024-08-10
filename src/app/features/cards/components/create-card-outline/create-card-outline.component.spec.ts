import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardOutlineComponent } from './create-card-outline.component';

describe('CreateCardOutlineComponent', () => {
  let component: CreateCardOutlineComponent;
  let fixture: ComponentFixture<CreateCardOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCardOutlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCardOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
