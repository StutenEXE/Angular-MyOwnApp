import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClothesService } from '../clothes.service';
import { IClothing } from '../clothing.interface';

@Component({
  templateUrl: './clothesdetail.component.html',
  styleUrls: ['./clothesdetail.component.css']
})
export class ClothesDetailComponent implements OnInit {
  sub!: Subscription;
  clothing: IClothing | undefined;
  ratingCropWidth!: number;

  constructor(private clothesService: ClothesService,
              private route : ActivatedRoute, 
              private router : Router) { }

  goBack(): void {
    this.router.navigate(["/clothes-shop"]);
  }

  cropRating(): void {
    console.log(this.clothing?.rating.rate);
    if (this.clothing != undefined) {
      this.ratingCropWidth = (Math.round(this.clothing?.rating.rate) * 75)/5;
    }
  }


  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.sub = this.clothesService.getProducts().subscribe({
      next : clothes => { 
          clothes.forEach(clothing => {
            if(clothing.id == id) {
              this.clothing = clothing;
              this.cropRating();
            }
          });
      },
      error : err => console.log(`[OOPSIES] - ${err}`)
    });

    registerLocaleData(localeFr, 'fr');
  }
}
