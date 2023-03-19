import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DraggableComponent } from './draggable.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [DraggableComponent],
  imports: [BrowserModule, BrowserAnimationsModule],
  exports: [DraggableComponent],
})
export class DraggableComponentModule {}
