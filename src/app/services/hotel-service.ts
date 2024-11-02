import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http:HttpClient) { }

  getAllHotel(){
    return this.http.get<Hotel[]>("http://localhost:3000/hotel")
  }
  createUser(hotel:Hotel){
    return this.http.post(`http://localhost:3000/hotel`,hotel)
  }
}
