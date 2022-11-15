import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClothesService } from './clothes.service';
import { IClothing } from './clothing.interface';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'

@Component({
  templateUrl: './clotheshop.component.html',
  styleUrls: ['./clotheshop.component.css']
})
export class ClotheShopComponent implements OnInit {
  sub!: Subscription;
  clothes: IClothing[] = [];

  constructor(private clothesService: ClothesService) { }

  ngOnInit(): void {
    this.sub = this.clothesService.getProducts().subscribe({
      next : clothes => { 
          this.clothes = clothes;
      },
      error : err => console.log(`[OOPSIES] - ${err}`)
    });

    registerLocaleData(localeFr, 'fr');
  }
}
