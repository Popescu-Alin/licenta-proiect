import { Component, OnInit } from '@angular/core';
import { DataReciverService } from '../../services/data-reciver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLogedIn: boolean = false;

  constructor(private dataRecever: DataReciverService,
              private router: Router) { }
  
  ngOnInit() {
    this.dataRecever.getIsLogedIn().subscribe( {
      next:(value) => {
        this.isLogedIn = value;
      }
    });
  }

  logOut() {
    this.dataRecever.clearServiceData();
    this.router.navigate(['/login']);
    this.dataRecever.setIsLogedIn(false);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
