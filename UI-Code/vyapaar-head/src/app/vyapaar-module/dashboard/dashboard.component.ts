import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';
import { ApiUrls } from '../utilities/api-urls';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  display: boolean = false;
  menuItem: String = "Profile";
  profileComp:boolean=true;
  listComp:boolean=false;
  admManageComp:boolean=false;
  masterComp:boolean=false;
  role:string='user';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.checkRole();
    const linkColor = document.querySelectorAll('.nav_link')
    function colorLink() {
      if (linkColor) {
        linkColor.forEach(l => l.classList.remove('active'))
        this.classList.add('active')
        this.menuItem = this.querySelectorAll('span')[0].textContent
        // console.log(this.menuItem)
      }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))
    this.showNavbar('header-toggle','nav-bar','body-pd','header')
  }


  showNavbar(toggleId, navId, bodyId, headerId) {

    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId)


    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener('click', () => {
        // show navbar
        nav.classList.toggle('show')
        // change icon
        toggle.classList.toggle('bx-x')
        // add padding to body
        bodypd.classList.toggle('body-pd')
        // add padding to header
        headerpd.classList.toggle('body-pd')
      })
    }
  }

  childSwitch(event:String){
    if(event=='profile') {
      this.profileComp=true;
      this.listComp=false;
      this.masterComp=false;
      this.admManageComp=false;
    }
    else if(event=='listing'){
      this.profileComp=false;
      this.listComp=true;
      this.masterComp=false;
      this.admManageComp=false;
    }
    else if(event=='admin'){
      this.profileComp=false;
      this.listComp=false;
      this.masterComp=false;
      this.admManageComp=true;
    }
    else if(event=='master'){
      this.profileComp=false;
      this.listComp=false;
      this.admManageComp=false;
      this.masterComp=true;
    }
    // if(event='listing') this.listComp=true;
    // else this.listComp=false;
  }

  logout(){
    localStorage.removeItem("token");
  }
  
  checkRole(){
    if(localStorage.getItem('token')){
      this.apiService.getWithoutId(ApiUrls.VERIFY_TOKEN).subscribe(res=>{
        console.log(res);
        if(res.success){
          this.role = res.data.role.name;
        }
      },err=>{
        console.log(err);
      })
    }
  }

}
