import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-unauthorized-page',
  templateUrl: './unauthorized-page.component.html',
  styleUrls: ['./unauthorized-page.component.scss']
})
export class UnauthorizedPageComponent implements OnInit {

  constructor(private router: Router,private titleService: TitleService) {
    this.titleService.setTitle("403");
   }

  ngOnInit() {
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

}
