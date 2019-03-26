import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {

  @Input() hotel: any;
  public imagePath: string = "";

  constructor() { 
    
  }

  ngOnInit() {    
    this.imagePath = `./assets/images/hotels/${this.hotel.image}`;
  }

}
