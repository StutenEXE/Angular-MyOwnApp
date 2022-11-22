import { GeoJsonObject } from "geojson"

export interface IMapDepartements {
    type: "String",
    features: [{
        type: string,
        geometry: GeoJsonObject[],
        properties: {
            code: string,
            nom: string
        }
    }]
}