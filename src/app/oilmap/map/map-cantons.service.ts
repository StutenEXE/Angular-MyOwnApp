import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { IMapCantons } from "./map-cantons.interface";
import * as latinize from "latinize";

@Injectable({
    providedIn : 'root'
})
export class MapCantonsService {
    private regionsUrl = "https://france-geojson.gregoiredavid.fr/repo/departements/";

    constructor(private http : HttpClient) {}

    getCantons(code: string, nom: string) : Observable<IMapCantons> {
        let id = code + '-' + latinize(nom).toLowerCase().replace("'","-");
        console.log(latinize(nom))
        let url = `${this.regionsUrl}${id}/arrondissements-${id}.geojson`
        return this.http.get<IMapCantons>(url).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err : HttpErrorResponse) {
        return throwError(() => "oopsies");
    }
}