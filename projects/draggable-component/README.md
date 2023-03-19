# DraggableComponent

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.0.

## How to use

- extend from DraggableComponent.

## options

you can override 3 methods, dragStart(), dragMove(), dragEnd() to add more logic to respectively : the start , during and at the end of your drag.

```
public dragStart();
public dragMove();
public dragEnd();
```

To deactivate the drag you can set isDraggable to false.

```
public isDraggable = true // default set to true
```
