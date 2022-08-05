import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordlistSelectionComponent } from './wordlist-selection.component';

describe('WordlistSelectionComponent', () => {
  let component: WordlistSelectionComponent;
  let fixture: ComponentFixture<WordlistSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordlistSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordlistSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
