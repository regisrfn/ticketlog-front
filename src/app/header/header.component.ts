import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  isActive = false
  isChecked = false
  isClicked = false
  addClassX = false
  queryParam: string | undefined

  handleScroll() {
    const scrollY = window.scrollY
    if (scrollY > 10) {
      document.getElementById("header")?.classList.add("scrollClass")
      this.isActive = true
    } else {
      document.getElementById("header")?.classList.remove("scrollClass")
      this.isActive = false
    }
  }

  clicked(line: HTMLSpanElement) {
    var vm = this;
    const span = line;
    this.isClicked = true;
    this.addClassX = false;

    span.onanimationend = () => {
      {
        vm.isClicked = false;
        if (this.isChecked) {
          this.addClassX = true;
        }
      }
    }
  }

  search() {
    console.log(this.route.snapshot);    
    this.router.navigate(['sc/search'])
  }

  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.addEventListener("scroll", this.handleScroll);
  }

}