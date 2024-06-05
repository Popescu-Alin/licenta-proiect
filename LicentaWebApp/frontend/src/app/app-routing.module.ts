import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MailConfirmationPageComponent } from './pages/mail-confirmation-page/mail-confirmation-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';

export const routes: Routes = [
    { path: 'auth/login', component: LoginPageComponent },
    { path: 'auth/sign-up', component: SignUpPageComponent },
    { path: 'auth/mail-confirmation/:email/:token',component: MailConfirmationPageComponent},
    { path: 'home', component: MainPageComponent, canActivate: [AuthGuard]},
    { path: 'profile/:id', component: ProfilePageComponent, canActivate: [AuthGuard]},
    { path: 'post/:id', component: PostPageComponent, canActivate: [AuthGuard]},
    { path: 'search', component: MainPageComponent, canActivate: [AuthGuard]},
    { path: '', redirectTo: '/auth/login', pathMatch: 'full'}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
