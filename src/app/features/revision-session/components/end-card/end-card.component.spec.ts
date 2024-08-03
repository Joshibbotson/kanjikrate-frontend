import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndCardComponent } from './end-card.component';

describe('EndCardComponent', () => {
  let component: EndCardComponent;
  let fixture: ComponentFixture<EndCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
