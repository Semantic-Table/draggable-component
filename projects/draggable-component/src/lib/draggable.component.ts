import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Renderer2,
} from '@angular/core';

export const movementAnimation = trigger('movement', [
  state('move', style({ transform: 'translate({{x}}px, {{y}}px)' }), {
    params: { x: 0, y: 0 },
  }),
  transition('* => *', animate(0)),
]);
@Component({
  template: '',
})
export class DraggableComponent {
  public isDraggable = true;

  public isDragged = false;

  public angle = 0;

  public minX = 0;
  public maxX = window.innerWidth;
  public minY = 0;
  public maxY = window.innerHeight;

  constructor(
    @Inject(ElementRef) public ref: ElementRef<HTMLDivElement>,
    @Inject(Renderer2) public renderer: Renderer2
  ) {
    this.ref.nativeElement.style.position = 'absolute';
    this.ref.nativeElement.style.touchAction = 'none';
  }

  @HostListener('pointerup', ['$event']) public onPointerUp(
    event: PointerEvent
  ) {
    event.preventDefault();
    this.dragEnd(event);
    this.isDragged = false;
  }

  @HostListener('pointerdown', ['$event']) public activateDrag(
    event: PointerEvent
  ): void {
    this.dragStart(event);
    if (this.isDragged) {
      this.isDragged = false;
    } else {
      this.isDragged = true;
    }
  }

  @HostListener('pointermove', ['$event']) public handleSwipe(
    event: PointerEvent
  ): void {
    this.dragMove(event);

    if (this.isDraggable && this.isDragged) {
      this.renderer.setProperty(this.ref.nativeElement, '@movement', {
        value: 'move',
        params: {
          x: event.pageX - this.ref.nativeElement.offsetWidth / 2,
          y: event.pageY - this.ref.nativeElement.offsetHeight / 2,
        },
      });
    }
  }

  public dragEnd(event: PointerEvent) {}
  public dragStart(event: PointerEvent) {}
  public dragMove(event: PointerEvent) {}
}
