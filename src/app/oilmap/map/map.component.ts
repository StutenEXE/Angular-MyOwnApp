import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapDepartementsService } from './map-departement.service';
import { IMapDepartements } from './map-departement.interface';

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
  private userMarker!: L.CircleMarker;
  depToggled: boolean = true;

  constructor(private departementsService : MapDepartementsService) { }

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
     this.departementsService.getRegions().subscribe({
      next : (departements: IMapDepartements) => { 
          departements.features.forEach((departement) => {
            let geoJSONComponent = L.geoJSON(departement.geometry).setStyle({
              color: DEPARTEMENT_DEFAULT_COLOR,
              fillColor: DEPARTEMENT_DEFAULT_COLOR,
            })
            .on("mouseover", (event) => handleDepartementMouseOver(event))
            .on("mouseout", (event) => handleDepartementMouseOut(event))
            .on("click", (event) => this.handleDepartementClick(event))
            .addTo(this.map);
            // We store each element
            this.departements.push(geoJSONComponent);
          })
      },
      error : (err) => console.log(`[OOPSIES] - ${err}`)
    });
  }

  showAllDepartements(): void {
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

  handleDepartementClick(event: L.LeafletMouseEvent) {
    this.hideDepartements(event.target);
    this.map.fitBounds(event.target.getBounds());
  }

  handleResetClick(): void {
    this.map.setView(this.CENTRE_FRANCE, 6);
    if(this.userMarker != null) this.userMarker.remove();
    this.showAllDepartements();
  }

  handleUserPosClick() {
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
        }).addTo(this.map);
        this.hideDepartements();
      },
      (err) => console.log("User denied access to geolocation"));
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

