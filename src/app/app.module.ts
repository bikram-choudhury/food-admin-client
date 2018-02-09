import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent }   from './app.component';

import { utilityService } from './services/app.utility.service';
import { commonService } from './services/common.service';
import { authenticatedGuard } from './guards/authenticatedGuard';
import { AuthGuard } from './guards/authGuard';
import { AuthService } from './services/auth.service';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import { OnlyActivePipe } from './pipes/only-active.pipe';

@NgModule({
    imports:      [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
        SidebarModule,
        NavbarModule,
        FooterModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
        OnlyActivePipe
    ],
    providers:[
        utilityService,
        commonService,
        authenticatedGuard,
        AuthService,
        AuthGuard,
        OnlyActivePipe
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
