import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { IClothing } from "./clothing.interface";

@Injectable({
    providedIn : 'root'
})
export class ClothesService {
    private clothesUrl = "https://fakestoreapi.com/products";

    constructor(private http : HttpClient) {}
    getProducts() : Observable<IClothing[]> {
        return this.http.get<IClothing[]>(this.clothesUrl).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err : HttpErrorResponse) {
        return throwError(() => "oopsies");
    }
}