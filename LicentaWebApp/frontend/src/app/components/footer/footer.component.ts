import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  pageNavigationSubscriptio: Subscription = new Subscription();
  isAuthPage: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.pageNavigationSubscriptio = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthPage = event.url.includes('auth/');
      }
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    this.pageNavigationSubscriptio.unsubscribe();
  }

}
