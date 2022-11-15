import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClothesDetailComponent } from './clothesdetail/clothesdetail.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClotheShopComponent } from './clotheshop.component';
import { LikebuttonModule } from '../shared/likebutton/likebutton.module';



@NgModule({
  declarations: [
    ClothesDetailComponent,
    ClotheShopComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    LikebuttonModule,
    RouterModule.forChild([
      { path: 'clothes-shop', component: ClotheShopComponent },
      { path: 'clothes-shop/:id', canActivate: [] , component: ClothesDetailComponent }
    ])
  ],
  exports: [
    ClothesDetailComponent,
    ClotheShopComponent
  ]
})
export class ClotheshopModule { }
