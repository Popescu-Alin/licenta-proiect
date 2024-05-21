import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { ModalComponent } from './modal/modal.component';
import { FooterComponent } from './footer/footer.component';
import { AddPostModalComponent } from './add-post-modal/add-post-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EmailNotConfirmedModalComponent } from './email-not-confirmed-modal/email-not-confirmed-modal.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { RepoComponent } from './repo/repo.component';
import { ReposListComponent } from './repos-list/repos-list.component';
import { AddRepoModalComponent } from './add-repo-modal/add-repo-modal.component';
import { SavePostPanelComponent } from './save-post-panel/save-post-panel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    PostComponent,
    ModalComponent,
    FooterComponent,
    AddPostModalComponent,
    NavBarComponent,
    EmailNotConfirmedModalComponent,
    PostsListComponent,
    RepoComponent,
    ReposListComponent,
    AddRepoModalComponent,
    SavePostPanelComponent,
  ],
  exports: [
    PostComponent,
    FooterComponent, 
    ModalComponent,
    AddPostModalComponent,
    NavBarComponent,
    EmailNotConfirmedModalComponent,
    PostsListComponent,
    RepoComponent,
    ReposListComponent,
    AddRepoModalComponent,
    SavePostPanelComponent,
  ]
})
export class ComponentsModule { }
