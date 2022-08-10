import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnWordlistComponent } from './learn-wordlist.component';

describe('LearnWordlistComponent', () => {
  let component: LearnWordlistComponent;
  let fixture: ComponentFixture<LearnWordlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnWordlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnWordlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
