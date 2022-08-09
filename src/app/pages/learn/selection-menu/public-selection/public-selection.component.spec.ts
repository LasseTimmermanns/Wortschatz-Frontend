import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSelectionComponent } from './public-selection.component';

describe('PublicSelectionComponent', () => {
  let component: PublicSelectionComponent;
  let fixture: ComponentFixture<PublicSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
