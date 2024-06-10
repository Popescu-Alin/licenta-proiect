import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MailConfirmationPageComponent } from './pages/mail-confirmation-page/mail-confirmation-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { RepoPageComponent } from './pages/repo-page/repo-page.component';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';

export const routes: Routes = [
    { path: 'auth/login', component: LoginPageComponent },
    { path: 'auth/sign-up', component: SignUpPageComponent },
    { path: 'mail-confirmation/:email/:token',component: MailConfirmationPageComponent},
    { path: 'home', component: MainPageComponent, canActivate: [AuthGuard]},
    { path: 'profile/:id', component: ProfilePageComponent, canActivate: [AuthGuard]},
    { path: 'post/:id', component: PostPageComponent, canActivate: [AuthGuard]},
    { path: 'search', component: SearchPageComponent, canActivate: [AuthGuard]},
    { path: 'repo/:id', component: RepoPageComponent, canActivate: [AuthGuard]},
    { path: '404', component: NotFoundPageComponent, canActivate: [AuthGuard]},
    { path: '403', component: UnauthorizedPageComponent, canActivate: [AuthGuard]},
    { path: 'auth/forgotten-password', component: ForgottenPasswordComponent},
    { path: 'reset-password/:email/:token', component: ResetPasswordComponent},
    { path: '*', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
