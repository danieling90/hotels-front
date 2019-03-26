import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private url = `${environment.urlApi}api/hotel/list`;

  constructor(private http: HttpClient) { }

  getHotels(data) {
    return this.http.post(`${this.url}`, data)
      .pipe(
        map(response => response)
      );
  }
}
