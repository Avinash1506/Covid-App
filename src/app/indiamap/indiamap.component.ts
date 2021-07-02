import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../data.service';
import * as L from 'leaflet';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-indiamap',
  templateUrl: './indiamap.component.html',
  styleUrls: ['./indiamap.component.css'],
})
export class IndiamapComponent implements OnInit, AfterViewInit {
  faArrowUp = faArrowUp;
  map;
  states;
  data;
  totalCases;
  newCases;
  totalDeaths;
  newDeaths;
  n;
  constructor(private ds: DataService) {}
  initMap(): void {
    const maxBounds = L.latLngBounds(
      L.latLng(6.4626999, 68.1097),
      L.latLng(37.513327, 97.39535869999999)
    );
    this.map = L.map('mapid', {
      center: [20.5937, 78.9629],
      //20.5937  78.9629
      //23 82.0
      zoom: 5,
      zoomControl: false,
      // maxBounds: maxBounds,
      // fitBounds:maxBounds
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 4,
        minZoom: 4,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1,
      }
    );
    tiles.addTo(this.map);
  }
  k = 0;
  // getColor(d) {
  //   this.k++;
  //   return d > 10000000
  //     ? '#800026'
  //     : d[this.k] > 500
  //     ? '#BD0026'
  //     : d[this.k] > 200
  //     ? '#E31A1C'
  //     : d[this.k] > 100
  //     ? '#FC4E2A'
  //     : d[this.k] > 50
  //     ? '#FD8D3C'
  //     : d[this.k] > 20
  //     ? '#FEB24C'
  //     : d[this.k] > 10
  //     ? '#FED976'
  //     : '#FFEDA0';
  // }
  // style(features) {
  //   return {
  //     fillColor: this.getColor(features.properties.cases),
  //     weight: 2,
  //     opacity: 1,
  //     color: 'white',
  //     dashArray: '3',
  //     fillOpacity: 0.7,
  //   };
  // }
  initStatesLayer() {
    let k = 0;
    let stateLayer;
    function getColor(d) {
      return d > 1000000
        ? '#800026'
        : d > 500000
        ? '#BD0010'
        : d > 100000
        ? '#E31A1C'
        : d > 50000
        ? '#FC4E2A'
        : '#FFEDA0';
    }
    function style1(features) {
      return {
        fillColor: getColor(features.properties.cases),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
      };
    }

    var info = L.control();
    info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info'); //creating div element with class info
      this.update();
      return this._div;
    };
    info.update = function (props) {
      this._div.innerHTML =
        '<h4>India covid cases</h4>' +
        (props
          ? '<b>' + props.st_nm + '</b><br/>' + props.cases + ' Covid Cases'
          : 'Hover over a state');
    };
    info.addTo(this.map);
    //making the map non movable when cursor is placed on it
    let mapid = document.querySelector('#mapid');
    mapid.addEventListener('mouseover', () => {
      this.map.dragging.disable();
    });
    //making the map movable when cursor is removed from it
    mapid.addEventListener('mouseout', () => {
      this.map.dragging.enable();
    });
    function highlightFeature(e) {
      var layer = e.target;
      layer.setStyle({
        colorweight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7,
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      info.update(layer.feature.properties);
    }
    function resetHighlight(e) {
      stateLayer.resetStyle(e.target);
      info.update();
    }
    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
      });
    }
    stateLayer = L.geoJSON(this.states, {
      style: style1,
      onEachFeature: onEachFeature,
    }).addTo(this.map);
    let i = 0;
    this.map.addLayer(stateLayer);
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initMap();
    this.ds.data1().subscribe((data) => {
      this.data = data;

      this.ds.getStateShapes().subscribe((states) => {
        this.states = states;
        let stateName,
          firstName,
          cases,
          casesArray = [];
        console.log(this.data);
        this.totalCases = this.data['statewise'][0]['confirmed'];
        this.n = this.data['cases_time_series'].length;
        this.newCases = data['cases_time_series'][this.n - 1]['dailyconfirmed'];
        this.totalDeaths = data['statewise'][0]['deaths'];
        this.newDeaths = data['cases_time_series'][this.n - 1]['dailydeceased'];
        console.log(this.newCases);
        console.log(this.totalCases);
        console.log(this.newDeaths);
        console.log(this.totalDeaths);
        // for adding cases details into states array
        for (let i = 0; i < this.states['features'].length; i++) {
          stateName = this.states['features'][i]['properties']['st_nm'];
          if (stateName == 'Arunanchal Pradesh') {
            this.states['features'][i]['properties']['st_nm'] =
              'Arunachal Pradesh'; //changing the name of arunachal pradesh
          }
          firstName = stateName.split(' ')[0];
          cases = 0;
          for (let val of this.data['statewise']) {
            let str = val['state'];
            if (firstName == 'Jammu') {
              if (str == 'Ladakh') cases = cases + +val['confirmed'];
            }
            if (str.indexOf(firstName) !== -1) {
              cases = cases + +val['confirmed'];
              //  break;
            }
            if (firstName == 'NCT') {
              if (str == 'Delhi') {
                cases += +val['confirmed'];
              }
            }
            if (firstName == 'Arunanchal') {
              if (str == 'Arunachal Pradesh') {
                cases += +val['confirmed'];
              }
            }
          }
          this.states['features'][i]['properties']['cases'] = cases;
        }
        this.initStatesLayer();
      });
    });
  }
}
