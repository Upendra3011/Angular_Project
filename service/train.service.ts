import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, Customer } from '../src/app/model/train';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  
  apiUrl:string = 'https://freeapi.miniprojectideas.com/api/TrainApp/';
  constructor(private http: HttpClient) { } 

  getAllStation () {
    debugger;
    return this.http.get(`${this.apiUrl}GetAllStations`)
  } 
  getTrainsSearch(from: number, to: number, Date: string){
    return this.http.get(`${this.apiUrl}GetTrainsBetweenStations?departureStationId=${from}&arrivalStationId=${to}&departureDate=${Date}`); 
    debugger;
  } 
  createNewCustomer(obj: Customer) {
    return this.http.post<APIResponse>(`${this.apiUrl}AddUpdatePassengers`,obj);
  } 
  onLogin(obj: any) { 
    return this.http.post<APIResponse>(`${this.apiUrl}Login`,obj);
}
  bookTrain(obj:any){
    return this.http.post<APIResponse>(`${this.apiUrl}BookTrain`, obj)
  }
}
