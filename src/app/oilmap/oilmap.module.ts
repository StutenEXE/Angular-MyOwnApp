import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { OilmapComponent } from './oilmap.component';



@NgModule({
  declarations: [
    OilmapComponent,
    MapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OilmapComponent
  ]
})
export class OilmapModule { }
