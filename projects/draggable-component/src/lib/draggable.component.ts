import { Component, ElementRef, HostListener, Inject } from '@angular/core';

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

  constructor(@Inject(ElementRef) public ref: ElementRef) {
    this.ref.nativeElement.style.position = 'absolute';
  }

  @HostListener('pointerup', ['$event']) public onPointerUp(
    event: PointerEvent
  ) {
    this.dragEnd(event);
    this.isDragged = false;
    this.resetPointer();
  }

  @HostListener('pointerout', ['$event']) public onPointerOut(
    event: PointerEvent
  ) {
    this.dragEnd(event);
    this.isDragged = false;
    this.resetPointer();
  }

  @HostListener('pointerCancel', ['$event']) public onPonterCancel(
    event: PointerEvent
  ) {
    this.dragEnd(event);
    this.isDragged = false;
    this.resetPointer();
  }

  @HostListener('pointerdown', ['$event']) public activateDrag(
    e: PointerEvent
  ): void {
    this.isDragged = true;
  }

  @HostListener('pointermove', ['$event']) public handleSwipe(
    e: PointerEvent
  ): void {
    if (this.isDraggable && this.isDragged) {
      const element = e.target as HTMLElement;
      const bounding = element.getBoundingClientRect();
      if (!this.prevX) {
        this.prevX = e.pageX;
      }

      if (!this.prevY) {
        this.prevY = e.pageY;
      }

      if (this.prevX && this.prevY) {
        const cardElement = this.ref.nativeElement;
        const movementX = e.pageX ? e.pageX - this.prevX : 0;
        const movementY = e.pageY ? e.pageY - this.prevY : 0;
        console.log(bounding.x);

        const xValue = cardElement.offsetLeft + movementX;
        const yValue = cardElement.offsetTop + movementY;

        this.clampPosition(xValue, yValue);

        const offsetLeft = this.ref.nativeElement.offsetLeft;
        const offsetTop = this.ref.nativeElement.offsetTop;

        this.prevX = e.pageX;
        this.prevY = e.pageY;

        if (offsetLeft < (this.maxX - cardElement.clientWidth) / 2) {
          this.handleRotation(90);
        } else if (offsetLeft > (this.maxX - cardElement.clientWidth) / 2) {
          this.handleRotation(270);
        } else if (offsetTop > window.innerHeight / 2) {
          this.handleRotation(0);
        } else if (
          offsetTop - cardElement.clientHeight <
          window.innerHeight / 2
        ) {
          this.handleRotation(180);
        }
      }
    }
  }

  public dragEnd(event: PointerEvent) {}

  public resetPointer() {
    this.prevX = undefined;
    this.prevY = undefined;
  }

  public handleRotation(angle: number): void {
    if (this.isRotatable) {
      this.angle = angle;
      this.ref.nativeElement.style.transform = `rotate(${angle}deg)`;
    }
  }

  public clampPosition(xValue: number, yValue: number) {
    const cardElement = this.ref.nativeElement;
    console.log('ui');

    xValue = Math.max(
      this.minX,
      Math.min(this.maxX - cardElement.clientWidth, xValue)
    );
    yValue = Math.max(
      this.minY,
      Math.min(this.maxY - cardElement.clientHeight, yValue)
    );

    cardElement.style.left = `${xValue}px`;
    cardElement.style.top = `${yValue}px`;
    console.log(this.ref.nativeElement.style.left);
  }
}
