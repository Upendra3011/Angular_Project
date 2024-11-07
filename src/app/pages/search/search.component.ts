import { Component, inject ,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIResponse, Customer, Istation, ITrain, Search } from '../../model/train';
import { TrainService } from '../../../../service/train.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DatePipe,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
closeRegister() {
throw new Error('Method not implemented.');
}

   activatedRoute = inject(ActivatedRoute); 

   trainService = inject(TrainService); 

   searchData: Search = new Search(); 

   trainList: ITrain[]=[]; 

   stationList : Istation[]=[]; 

   selectedTrain?: ITrain; 

   passenger: any = {
      "passengerName": "",
      "age": ""
   } 
   passengerList :any[]=[];  

   loggedUserData: Customer = new Customer();  

   constructor(){ 
    const localData = localStorage.getItem('trainApp'); 
    if(localData != null){
       this.loggedUserData = JSON.parse(localData)
    }
    this.activatedRoute.params.subscribe((res:any) =>{
      debugger;
        this.searchData.fromStationId = res.fromStationId ; 
        this.searchData.toStationId = res.toStationId; 
        this.searchData.dateOfTravel = res.dateOfTravel; 
        this.getSearchTrains()
    }) 
   }
   ngOnInit(): void {
    this.loadAllStation();
  }
   getSearchTrains(){
      this.trainService.getTrainsSearch(this.searchData.fromStationId, this.searchData.toStationId, this.searchData.dateOfTravel).subscribe((res:any)=>{
        debugger; 
      this.trainList = res.data; 
   })
} 
loadAllStation() {
  this.trainService.getAllStation().subscribe((res:any)=>{
    this.stationList = res.data; 
  })
}
open(train: ITrain){
  this.selectedTrain = train; 
  const model = document.getElementById("myBookModal"); 
  if(model != null) {
    model.style.display = 'block'
  } 
} 
close(){
  const model = document.getElementById("myBookModal"); 
  if(model != null) {
    model.style.display = 'none'
  } 
} 
addPassenger(){
  const strObj = JSON.stringify(this.passenger)
  const parseObj = JSON.parse(strObj); 
  this.passengerList.push(parseObj); 
} 
bookTicket(){
  debugger; 
  const bookingObj ={
      "bookingId": 0,
      "trainId": this.selectedTrain?.trainId,
      "passengerId": this.loggedUserData.passengerID,
      "travelDate": this.searchData.dateOfTravel,
      "bookingDate": new Date(),
      "totalSeats": 0,
      "TrainAppBookingPassengers": [] as any, 
      
    }; 
    bookingObj.TrainAppBookingPassengers = this.passengerList;
    bookingObj.totalSeats = this.passengerList.length; 
    this.trainService.bookTrain(bookingObj).subscribe((res:APIResponse)=>{
      if(res.result){
        alert("Ticket Booked Success")
      } else {
        alert(res.message)
      }
    })
  } 
}

