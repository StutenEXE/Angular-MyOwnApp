import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { IMapOil } from "./map-stations.interface";

@Injectable({
    providedIn : 'root'
})
export class MapOilService {
    private oilUrl = "https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-carburants-fichier-instantane-test-ods-copie&q=&rows=10000&facet=adresse&facet=ville&facet=prix_maj&facet=prix_nom&refine.dep_code=";

    constructor(private http : HttpClient) {}

    getOil(codedep: string) : Observable<IMapOil> {
        let url = this.oilUrl + codedep;
        console.log(url)
        return this.http.get<IMapOil>(url).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(err : HttpErrorResponse) {
        return throwError(() => "oopsies");
    }
}