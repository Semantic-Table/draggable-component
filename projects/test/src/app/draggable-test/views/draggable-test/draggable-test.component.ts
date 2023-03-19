import { DraggableComponent, movementAnimation } from './../../../../../../draggable-component/src/lib/draggable.component';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-draggable-test',
  templateUrl: './draggable-test.component.html',
  styleUrls: ['./draggable-test.component.scss'],
  animations : [movementAnimation]
})
export class DraggableTestComponent
  extends DraggableComponent
  implements OnInit
{
  public i = 0;

  constructor(
    @Inject(ElementRef) public override ref: ElementRef,
    @Inject(Renderer2) public override renderer: Renderer2,
  ) {
    super(ref, renderer);
  }

  ngOnInit(): void {}

  public plusOne() {
    this.i++;
  }
}
