import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';

@Component({
  selector: 'app-san-jose',
  templateUrl: './san-jose.component.html',
  styleUrls: ['./san-jose.component.css']
})
export class SanJoseComponent implements OnInit {
  city = new City;

  constructor(private _httpService: HttpService) { 
    this.city.name = "San Jose, CA";
    this._httpService.retrieve('san-jose')
    .then (api => {
      this.city.humidity = api['main']['humidity'];
      this.city.tempAvg = Math.floor((api['main']['temp']-273)*(9/5));
      this.city.tempHigh = Math.floor((api['main']['temp_max']-273)*(9/5));
      this.city.tempLow = Math.floor((api['main']['temp_min']-273)*(9/5));
      this.city.status = api['weather'][0]['description'];
      console.log(this.city.humidity);
    })
    .catch (err => {console.log(err);})
  }

  ngOnInit() {
    console.log(this.city.name);
  }

}

class City {
  public name: string;
  public humidity: number;
  public tempAvg: number;
  public tempHigh: number;
  public tempLow: number;
  public status: string;
}