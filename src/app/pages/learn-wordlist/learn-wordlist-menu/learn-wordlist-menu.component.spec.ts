import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnWordlistMenuComponent } from './learn-wordlist-menu.component';

describe('LearnWordlistMenuComponent', () => {
  let component: LearnWordlistMenuComponent;
  let fixture: ComponentFixture<LearnWordlistMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnWordlistMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnWordlistMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
