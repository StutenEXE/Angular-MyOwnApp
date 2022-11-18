import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClotheShopComponent } from './clotheshop/clotheshop.component';
import { LikebuttonComponent } from './shared/likebutton/likebutton.component';
import { ClotheshopModule } from './clotheshop/clotheshop.module';
import { OilmapComponent } from './oilmap/oilmap.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OilmapComponent
  ],
  imports: [
    BrowserModule,
    ClotheshopModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent},
      { path: "clothes-shop", component: ClotheShopComponent},
      { path: "", redirectTo: "home", pathMatch: "full" },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
