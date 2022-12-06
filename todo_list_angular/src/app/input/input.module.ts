import { InputComponent } from './input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputComponent,
    MatFormFieldModule
  ],
  exports: [InputComponent]
})
export class InputModule { }
