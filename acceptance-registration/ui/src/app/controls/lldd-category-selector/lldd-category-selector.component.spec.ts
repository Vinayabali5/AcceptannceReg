import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LLDDCategorySelectorComponent } from './lldd-category-selector.component';

describe('LlddCategorySelectorComponent', () => {
  let component: LLDDCategorySelectorComponent;
  let fixture: ComponentFixture<LLDDCategorySelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LLDDCategorySelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LLDDCategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
