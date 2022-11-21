import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { IMapDepartements } from "./map-departement.interface";

@Injectable({
    providedIn : 'root'
})
export class MapDepartementsService {
    // ./api/departements.geojson
    private regionsUrl = "https://france-geojson.gregoiredavid.fr/repo/departements.geojson";

    constructor(private http : HttpClient) {}
    getRegions() : Observable<IMapDepartements> {
        return this.http.get<IMapDepartements>(this.regionsUrl).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err : HttpErrorResponse) {
        return throwError(() => "oopsies");
    }
}