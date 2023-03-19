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
  public isRotatable = false;

  public isDragged = false;

  public angle = 0;

  public prevX: number | undefined = 0;
  public prevY: number | undefined = 0;

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
    console.log('pointerup');
    
    event.preventDefault();
    this.dragEnd(event);
    this.isDragged = false;
    this.resetPointer();
  }

  @HostListener('pointerdown', ['$event']) public activateDrag(
    event: PointerEvent
  ): void {
    console.log('pointerdown');
    
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
    
    console.log('pointermove');
    
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

  public resetPointer() {
    this.prevX = undefined;
    this.prevY = undefined;
  }

  public handleRotation(): void {
    if (this.isRotatable) {
      const element = this.ref.nativeElement;
      const offsetLeft = this.ref.nativeElement.offsetLeft;
      const offsetTop = this.ref.nativeElement.offsetTop;
      if (offsetLeft < (this.maxX - element.clientWidth) / 4) {
        this.angle = 90;
      } else if (offsetLeft > (this.maxX - element.clientWidth) / 1.4) {
        this.angle = 270;
      } else if (offsetTop > (this.maxY - element.clientHeight) / 2) {
        this.angle = 0;
      } else if (offsetTop < (this.maxY - element.clientHeight) / 2) {
        this.angle = 180;
      }
      this.ref.nativeElement.style.transform = `rotate(${this.angle}deg)`;
    }
  }
}
