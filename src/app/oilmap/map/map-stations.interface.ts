import { GeoJsonObject } from "geojson"

export interface IMapOil {
    nhits: number,
    parameters: {
        dataset: string,
        rows: number,
        start: number,
        facet: string[],
        format: string,
        refine: string,
        timezone: string
    },
    records: [{
        datasetid: string,
        recordid: string,
        fields: {
            ville: string,
            pop: string,
            reg_name: string,
            com_arm_code: string,
            dep_name: string,
            prix_nom: string,
            com_code: number,
            epci_name: string,
            dep_code: number,
            services_service: string,
            prix_id: number
            horaires_automate_24_24: string,
            horaires: string,
            com_arm_name: string,
            prix_maj: string,
            id: string,
            reg_code: number,
            adresse: string,
            geom: L.LatLng,
            epci_code: string,
            cp: string,
            prix_valeur: number,
            com_name: string
        },
        geometry: GeoJsonObject
    }],
    facet_groups: [{
        name: string,
        facets: [{
            name: string,
            count: number,
            state: string,
            path: string
        }]
    }]
}