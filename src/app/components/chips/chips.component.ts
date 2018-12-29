import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsComponent),
      multi: true,
    }
  ],
})
export class ChipsComponent implements ControlValueAccessor {
  
  writeValue(value) {
    if (!value) {
      return
    }
    // this.selected = value;
    for (const v of value) {
      this.selected[v]=true;
    }
    //this.onChange([]);
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  @Input() chips: string[] = [];

  selected = {};

  constructor() { }

  onChipClick(chip) {
    this.onTouched();
    if (this.selected[chip]) {
      delete this.selected[chip];
    } else {
      this.selected[chip] = true;
    }
    this.onChange(Object.keys(this.selected));
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  registerOnChange(fn) {
    console.log('register on change');
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
