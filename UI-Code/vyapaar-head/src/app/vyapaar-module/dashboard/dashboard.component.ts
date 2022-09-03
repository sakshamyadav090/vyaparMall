import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  display: boolean = false
  menuItem: String = "Profile"

  constructor() { }

  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.nav_link')
    function colorLink() {
      if (linkColor) {
        linkColor.forEach(l => l.classList.remove('active'))
        this.classList.add('active')
        this.menuItem = this.querySelectorAll('span')[0].textContent
        console.log(this.menuItem)
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

}
