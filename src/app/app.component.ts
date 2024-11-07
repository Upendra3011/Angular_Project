import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIResponse, Customer } from './model/train';
import { FormsModule } from '@angular/forms';
import { TrainService } from '../../service/train.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   
  registerObj: Customer = new Customer(); 
  trainService = inject(TrainService) 

  loginObj : any = {
    phone:"", 
    password:""
  }   
   
  loggedUser : Customer = new Customer();
  
  onLoggOff(){
   this.loggedUser = new Customer(); 
   localStorage.removeItem("trainApp")
  }

  openRegister(){
    const model = document.getElementById("registerModel"); 
    if(model != null){
       model.style.display = 'block'
    }
  }   
  openLogin(){
    const model = document.getElementById("loginModel"); 
    if(model != null){
       model.style.display = 'block'
    }
  }  
  closeRegister(){
    const model = document.getElementById("registerModel"); 
    if(model != null){
       model.style.display = 'none'
    }
  }  
  closelogin(){
    const model = document.getElementById("loginModel"); 
    if(model != null){
       model.style.display = 'none'
    }
  }  
  onRegister(){
     this.trainService.createNewCustomer(this.registerObj).subscribe((res:APIResponse) => {
      if(res.result){
        alert("Registration Success");
        this.closeRegister(); 
      } else{
        alert(res.message)
      }
   }) 
} 
  onLogin(){
   this.trainService.onLogin(this.loginObj).subscribe((res:APIResponse) => {
    if(res.result){
     alert("Login Success");
     localStorage.setItem('trainApp',JSON.stringify(res.data));   
     this.loggedUser = res.data; 
     this.closelogin(); 
    } else{
     alert(res.message)
    }
}) 
} 
}
