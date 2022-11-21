import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClotheShopComponent } from './clotheshop/clotheshop.component';
import { ClotheshopModule } from './clotheshop/clotheshop.module';
import { OilmapComponent } from './oilmap/oilmap.component';
import { OilmapModule } from './oilmap/oilmap.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ClotheshopModule,
    OilmapModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "clothes-shop", component: ClotheShopComponent },
      { path: "oil-map", component: OilmapComponent },
      { path: "", redirectTo: "home", pathMatch: "full" },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
