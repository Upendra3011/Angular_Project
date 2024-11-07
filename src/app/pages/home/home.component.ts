import { Component , Inject, inject , OnInit } from '@angular/core';
import { TrainService } from '../../../../service/train.service';
import { Istation } from '../../model/train';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    
  trainService = inject(TrainService);

  router = inject(Router);

  stationList : Istation[]=[];

  fromStationId: number = 0; 
  toStationId : number = 0;
  dateOfTravel: any;

  ngOnInit(): void {
     this.loadAllStation();
  }
  loadAllStation() {
    this.trainService.getAllStation().subscribe((res:any)=>{
      this.stationList = res.data; 
    })
  }
  onSearch() {
    if(this.fromStationId == 0 || this.toStationId == 0 || this.dateOfTravel == '') {
      alert("Select Your Journey Details...")
    }else{
      if(this.fromStationId == this.toStationId) {
        alert("Both are station same .. ")
      }else{
          this.router.navigate(['/search',this.fromStationId,this.toStationId,this.dateOfTravel])
      }
    } 
  } 
}
