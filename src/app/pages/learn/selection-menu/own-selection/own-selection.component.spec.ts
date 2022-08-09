import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnSelectionComponent } from './own-selection.component';

describe('OwnSelectionComponent', () => {
  let component: OwnSelectionComponent;
  let fixture: ComponentFixture<OwnSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
