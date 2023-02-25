import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableTestComponent } from './views/draggable-test/draggable-test.component';

@NgModule({
  declarations: [DraggableTestComponent],
  imports: [CommonModule],
  exports: [DraggableTestComponent],
})
export class DraggableTestModule {}
