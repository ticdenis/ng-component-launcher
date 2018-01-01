# Angular Component Launcher

This library provides a simple and lightweight service to dynamically create components.

## Installation

```bash
npm i --save ng-component-launcher
```

## Usage

First, import the **ComponentLauncherModule** to your module:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentLauncherModule } from 'ng-component-launcher';
import { AppComponent } from './app';

@NgModule({
  imports:[ BrowserModule, ComponentLauncherModule /* required */ ],
  declarations: [ AppComponent ],
  entryComponents: [ AlertComponent /* your component */ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

In this example, the **create** method will dynamically create the received component, previously this component must be declared to be compiled in the *entryComponents AppModule property*.

```typescript
import { Component } from '@angular/core';
import { ComponentLauncher } from 'ng-component-launcher';

@Component({ 
  selector: 'app',
  template: `<button (click)="showAlert()">Show Alert</button>`
 })
export class AppComponent {

  constructor(private launcher: ComponentLauncher) { }

  showAlert(): void {
    const ref = this.launcher.create(AlertComponent);
    const component = ref.instance;
    // ...
    this.launcher.destroy(ref);
  }

}
```