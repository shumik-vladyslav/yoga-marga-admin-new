import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullModalComponent } from './full-modal.component';
import { FullModalService } from './full-modal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FullModalComponent
  ],
  exports: [
    FullModalComponent
  ],
  providers: [
    FullModalService
  ]
})
export class FullModalModule {

}
