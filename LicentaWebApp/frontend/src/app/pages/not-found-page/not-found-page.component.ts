import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent implements OnInit {
  constructor(private router: Router, private titleService: TitleService) {
    this.titleService.setTitle('404');
  }

  ngOnInit() {}

  navigateHome() {
    this.router.navigate(['/home']);
  }
}
