import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentLauncherModule } from './component-launcher.module';

@Component({
  selector: 'app-root',
  template: '',
})
export class AppComponent { }

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ComponentLauncherModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
