import { Component, OnInit } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import * as L from 'leaflet';
import { DataService } from '../data.service';
@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.css'],
})
export class WorldmapComponent implements OnInit {
  totalCases: number;
  totalDeaths: number;
  newCases: number;
  newDeaths: number;
  faArrowUp = faArrowUp;
  country = {};
  map;
  data;
  countries_data;
  constructor(private ds: DataService) {}
  initMap(): void {
    this.map = L.map('mapid', {
      center: [40.52, 34.34],
      //20.5937  78.9629
      //23 82.0
      zoom: 1,
      zoomControl: false,
      // maxBounds: maxBounds,
      // fitBounds:maxBounds
    });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 4,
        minZoom: 1,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1,
      }
    );
    tiles.addTo(this.map);
  }
  // initStateLayers()
  initStateLayers() {
    let k = 0;
    let stateLayer;
    function getColor(d) {
      return d > 15000000 // 15000000
        ? '#800026'
        : d > 4000000
        ? '#BD0010'
        : d > 1000000
        ? '#E31A1C'
        : d > 500000
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
        '<h4>World covid cases</h4>' +
        (props
          ? '<b>' + props.ADMIN + '</b><br/>' + props.cases + ' Covid Cases'
          : 'Hover over a country');
    };
    info.addTo(this.map);
    //making the map non movable when cursor is placed on it
    // let mapid = document.querySelector('#mapid');
    // mapid.addEventListener('mouseover', () => {
    //   this.map.dragging.disable();
    // });
    // //making the map movable when cursor is removed from it
    // mapid.addEventListener('mouseout', () => {
    //   this.map.dragging.enable();
    // });
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
    stateLayer = L.geoJSON(this.countries_data, {
      style: style1,
      onEachFeature: onEachFeature,
    }).addTo(this.map);
    let i = 0;
    this.map.addLayer(stateLayer);
    this.map.setView([0, 0]);
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initMap();
    this.ds.getWorldcases().subscribe((data1) => {
      console.log('World data is: ', data1);
      let data = data1['world_data'];
      let countries_names = [];
      console.log(data);
      for (let val of data['countries_stat']) {
        countries_names.push(val['country_name']);
      }
      countries_names.sort();
      for (let val of countries_names) {
        console.log(val);
      }
      this.data = data; //storing country data
      // this.active = data['world_total']['active_cases'];
      this.totalCases = data['world_total']['total_cases'];
      this.totalDeaths = data['world_total']['total_deaths'];
      this.newCases = data['world_total']['new_cases'];
      this.newDeaths = data['world_total']['new_deaths'];
      //storing country__name and cases as key-value pair
      let arr = [];
      for (let val of data['countries_stat']) {
        let str = val['cases'].replace(',', '');
        let str1 = str.replace(',', '');
        let str11 = +str1;
        this.country[val['country_name']] = str11; //str11;
        //arr.push(str11);
      }
      // arr.sort();
      // arr.sort(function (a, b) {
      //   return b - a;
      // });
      this.ds.getCountriesCoordinates().subscribe((countries_data) => {
        //traversing through the array which contains co-ordinates
        this.countries_data = countries_data;
        let idxarray = [];
        for (let i = 0; i < this.countries_data['features'].length; i++) {
          let str1 = this.countries_data['features'][i]['properties']['ADMIN'];
          let cases =
            this.country[
              this.countries_data['features'][i]['properties']['ADMIN']
            ];
          if (cases == undefined) {
            cases =
              this.country[
                this.countries_data['features'][i]['properties']['ISO_A3']
              ];
          }
          if (cases == undefined) {
            let str = this.countries_data['features'][i]['properties']['ADMIN'];
            if (str === 'United Arab Emirates') {
              cases = this.country['UAE'];
            } else if (str == 'United Kingdom') {
              cases = this.country['UK'];
            } else if (str === 'Hong Kong S.A.R') {
              cases = this.country['Hong Kong'];
            } else if (str == 'Republic of Congo') {
              cases = this.country['Congo'];
            } else if (str == 'United Republic of Tanzania') {
              cases = this.country['Tanzania'];
            } else if (str == 'Republic of Serbia') {
              cases = this.country['Serbia'];
            } else if (str == 'Democratic Republic of the Congo') {
              cases = this.country['Congo'];
            } else if (str == 'South Korea') {
              cases = this.country['S. Korea'];
            } else if (str == 'Czech Republic') {
              cases = this.country['Czechia'];
            }
            if (cases == undefined) {
              console.log(
                this.countries_data['features'][i]['properties']['ADMIN']
              );
              console.log('Strigng is ', str);
              idxarray.push(i);
            }
          }
          if (cases != undefined) {
            this.countries_data['features'][i]['properties']['cases'] = cases;
          }
        }
        let x = 0;
        for (let idx of idxarray) {
          idx = idx - x; //after removing one element rest all the elements will move forward by one hence reducing the idx value by that amount
          x++;
          this.countries_data['features'].splice(idx, 1);
        }
        this.initStateLayers();
      });
    });
  }
}
