import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router-deprecated'

@Component({
  selector: 'my-home',
  template: require('./home.component.html'),
  styles: [require('./home.component.scss')]
})
export class HomeComponent implements OnInit {
  cities = [];
  city: any;
  citiesDropdown = false;

  constructor(private http: Http, public router: Router) {
    // Do stuff
	this.city = {}

  }

  ngOnInit() {
    console.log('Hello Home');
  }

  getCitites(model){
	  console.log(model);
	  if (model.length > 2){
		  this.http.get('maps/api/geocode/json?&address=' + model).
			  subscribe(response => {
				  response.json();
				  console.log(response.json());
				  this.cities = response.json().results;
				  this.citiesDropdown = true;
			  })
	  }
  }

  handleClickCities(cityItem) {
	  this.city = cityItem;
	  this.citiesDropdown = false;
  }

  getCityLocation(){
	  console.log(this.city.geometry);
	  this.router.navigate(['Explore', this.city.geometry.location]);
  }
}

