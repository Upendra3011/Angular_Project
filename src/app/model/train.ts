export interface Istation {
    stationID : number;
    stationName : string; 
    stationCode : string; 
}   
export interface APIResponse {
    message: string; 
    result: boolean; 
    data: any;
} 
export class Search {
    fromStationId: number; 
    toStationId: number;
    dateOfTravel: string; 

    constructor(){
        this.fromStationId = 0 ; 
        this.toStationId = 0 ; 
        this.dateOfTravel = '';
    }
} 
export interface ITrain {
    trainId: number
    trainNo: number
    trainName: string
    departureStationName: string
    arrivalStationName: string
    arrivalTime: string
    departureTime: string
    totalSeats: number
    departureDate: string
    bookedSeats: number 
  } 
  export class Customer {
    passengerID: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;   

    constructor() {
        this.email = ''; 
        this.firstName = ''; 
        this.passengerID = 0; 
        this.lastName =''; 
        this.phone =''; 
        this.password =''; 
    }
  }