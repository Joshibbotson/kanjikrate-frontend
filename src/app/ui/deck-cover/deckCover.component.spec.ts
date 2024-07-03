import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckCoverComponent } from './deckCover.component';

describe('DeckCard', () => {
  let component: DeckCoverComponent;
  let fixture: ComponentFixture<DeckCoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeckCoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
