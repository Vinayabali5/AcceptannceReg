import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { LLDDCategory } from 'src/app/model/lldd-category';
import { LLDDCategoryService } from 'src/app/service/lldd-category.service';

@Component({
  selector: 'lldd-category-selector',
  templateUrl: './lldd-category-selector.component.html',
  styleUrls: ['./lldd-category-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LLDDCategorySelectorComponent),
      multi: true,
    },
  ],
})
export class LLDDCategorySelectorComponent
  implements OnInit, ControlValueAccessor
{
  onChange: any = () => {};
  onTouch: any = () => {};

  private data: LLDDCategory[] = [];

  private error?: any;

  public selection = new SelectionModel<LLDDCategory>(true, []);

  constructor(private service: LLDDCategoryService) {}

  ngOnInit(): void {
    this.getLLDDCategories();
  }

  getLLDDCategories() {
    this.service.getLLDDCategories().subscribe(
      (res) => (this.data = res),
      (error) => (this.error = <any>error)
    );
  }

  lldds(): LLDDCategory[] | undefined {
    return this.data;
  }

  updateSelection(lldd: LLDDCategory) {
    this.selection.toggle(lldd);
    this.onChange(this.selection.selected);
  }

  writeValue(selected: LLDDCategory[]): void {
    console.log(selected);
    this.selection = new SelectionModel<LLDDCategory>(true, selected);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
