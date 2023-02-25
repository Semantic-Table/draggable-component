import { DraggableComponent } from './../../../../../../draggable-component/src/lib/draggable.component';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-draggable-test',
  templateUrl: './draggable-test.component.html',
  styleUrls: ['./draggable-test.component.scss'],
})
export class DraggableTestComponent
  extends DraggableComponent
  implements OnInit
{
  constructor(@Inject(ElementRef) public override ref: ElementRef) {
    super(ref);
  }

  ngOnInit(): void {}
}
