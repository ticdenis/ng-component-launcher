import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentLauncher } from './component-launcher.service';

@NgModule({
  imports: [ CommonModule ],
  providers: [ComponentLauncher]
})
export class ComponentLauncherModule { }
