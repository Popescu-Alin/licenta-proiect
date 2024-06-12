import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataReciverService } from '../../services/data-reciver.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  pageNavigationSubscriptio: Subscription = new Subscription();
  isAuthPage: boolean = false;
  isAddPostModalOpen: boolean = false;

  isMenuOpen: boolean = false;

  constructor(private router: Router,
    private dataReciver: DataReciverService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.pageNavigationSubscriptio = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAuthPage = event.url.includes('auth/');
        this.isMenuOpen = false;
      }
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    this.pageNavigationSubscriptio.unsubscribe();
  }

  navigateToProfile() {
    this.dataReciver.getApplicationUserId()
    this.router.navigate(['/profile', this.dataReciver.getApplicationUserId()]);
  }

  openModal(){
    this.isAddPostModalOpen = true;
  }

  closeAddPostModal(){
    this.isAddPostModalOpen = false;
  }
  
  logout(){
    this.router.navigate(['/auth/login']);
    this.dataReciver.clearServiceData();
  }

  openMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    if(!this.isMenuOpen){
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isMenuOpen = false;
    }
  }
}
