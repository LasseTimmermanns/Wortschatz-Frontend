import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnWordlistCardComponent } from './learn-wordlist-card.component';

describe('LearnWordlistCardComponent', () => {
  let component: LearnWordlistCardComponent;
  let fixture: ComponentFixture<LearnWordlistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnWordlistCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnWordlistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
