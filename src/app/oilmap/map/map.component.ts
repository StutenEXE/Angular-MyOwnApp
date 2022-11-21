import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapDepartementsService } from './map-departement.service';
import { IMapDepartements } from './map-departement.interface';
import { MapCantonsService } from './map-cantons.service';
import { IMapCantons } from './map-cantons.interface';

const DEPARTEMENT_DEFAULT_COLOR = "#0000FF";
const DEPARTEMENT_HOVER_COLOR = "#FF0000";



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private CENTRE_FRANCE: L.LatLng = new L.LatLng(46.4606, 2.2557);
  private map!: L.Map;
  private departements: L.GeoJSON<any>[] = [];
  private cantons: L.GeoJSON<any>[] = []
  private userMarker: L.CircleMarker | undefined;
  depToggled: boolean = true;

  constructor(private departementsService : MapDepartementsService,
              private cantonsService: MapCantonsService) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Map creation
    this.map = L.map('map', {
      center: this.CENTRE_FRANCE,
      zoom: 6
    });

    // Map bg creation
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    // Regions poly creation
    this.initDepartementsPolys();
  }

  initDepartementsPolys(): void {
    // We fetch all the departement geoJSON data 
    // if we didn't do it yet
    // Then we show all the departements on the map
    if (this.departements.length == 0) {
      this.fetchDepartementData();
    }
  }

  fetchDepartementData(): void {
     this.departementsService.getDepartement().subscribe({
      next : (departements: IMapDepartements) => { 
          departements.features.forEach((departement) => {
            let geoJSONComponent = L.geoJSON(departement.geometry).setStyle({
              color: DEPARTEMENT_DEFAULT_COLOR,
              fillColor: DEPARTEMENT_DEFAULT_COLOR,
            })
            .on("mouseover", (event) => handleDepartementMouseOver(event))
            .on("mouseout", (event) => handleDepartementMouseOut(event))
            .on("click", (event) => this.handleDepartementClick(event, departement.properties))
            .addTo(this.map);
            // We store each element
            this.departements.push(geoJSONComponent);
          })
      },
      error : (err) => console.log(`[OOPSIES] - ${err}`)
    });
  }

  showAllDepartements(): void {
    this.hideAllCantons();
    this.depToggled = true;
    this.departements.forEach(departement => {
      departement.addTo(this.map);
    });
  }

  hideDepartements(exception?: L.GeoJSON<any>) {
    this.depToggled = false;
    this.departements.forEach(departement => {
      if(exception==null || !departement.getBounds().equals(exception.getBounds())) {
        departement.remove();
      }
    });
  }

  hideAllCantons() {
    this.cantons.forEach(canton => {
        canton.remove();
    });
  }

  handleDepartementClick(event: L.LeafletMouseEvent, depData: any) {
    this.hideDepartements();
    this.map.fitBounds(event.target.getBounds());
    event.target.fire("mouseout");
    this.fetchCantonsData(depData);
  }

  fetchCantonsData(depData: any): void {
    this.cantonsService.getCantons(depData.code, depData.nom).subscribe({
     next : (cantons: IMapCantons) => { 
         cantons.features.forEach((canton) => {
           let geoJSONComponent = L.geoJSON(canton.geometry).setStyle({
             color: DEPARTEMENT_DEFAULT_COLOR,
             fillColor: DEPARTEMENT_DEFAULT_COLOR,
           })
           .on("mouseover", (event) => handleDepartementMouseOver(event))
           .on("mouseout", (event) => handleDepartementMouseOut(event))
           .on("click", (event) => this.handleCantonClick(event))
           .addTo(this.map);
           // We store each element
           this.cantons.push(geoJSONComponent);
         })
     },
     error : (err) => console.log(`[OOPSIES] - ${err}`)
   });
  }

 handleCantonClick(event: L.LeafletMouseEvent) {
  // this.hideDepartements();
  this.map.fitBounds(event.target.getBounds());
}

  handleResetClick(): void {
    this.map.setView(this.CENTRE_FRANCE, 6);
    if(this.userMarker != undefined) {
      this.userMarker.remove();
      this.userMarker = undefined;
    }
    this.showAllDepartements();
    this.hideAllCantons();
  }

  handleUserPosClick() {
    if (this.userMarker == undefined) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let userPos = new L.LatLng(position.coords.latitude, position.coords.longitude);
          this.map.setView(userPos, 18);
          this.userMarker = L.circleMarker(userPos, {
            weight: 8,
            radius: 8,
            color: "#0000FF",
            opacity: 0.3,
            fillColor: "#0000FF",
            fillOpacity: 1
          }).addTo(this.map).bindPopup("Your position");
          this.hideDepartements();
          this.hideAllCantons()
        },
        (err) => console.log("User denied access to geolocation"));
    }
    else {
      this.hideDepartements();
      this.hideAllCantons();
      this.map.setView(this.userMarker.getLatLng(), 18);
    }
  }

  handleToggleDepPoly() {
    this.depToggled = !this.depToggled;
    if(this.depToggled) {
      this.showAllDepartements();
    }
    else {
      this.hideDepartements();
    }
  }
}

// The functions below do not need any local componenent (this.)
function handleDepartementMouseOver(event: L.LeafletMouseEvent): void {
  event.target.setStyle({
    color: DEPARTEMENT_HOVER_COLOR,
    fillColor: DEPARTEMENT_HOVER_COLOR
  });
  event.target.bringToFront();
}

function handleDepartementMouseOut(event: L.LeafletMouseEvent): void {
  event.target.setStyle({
    color: DEPARTEMENT_DEFAULT_COLOR,
    fillColor: DEPARTEMENT_DEFAULT_COLOR
  });
}

