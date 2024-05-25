import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
role:String
bannerImageUrl: string = 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; 
ngOnInit(){
  let user=JSON.parse(localStorage.getItem('user'))
  this.role=user? user.role:null;
  

}
}
