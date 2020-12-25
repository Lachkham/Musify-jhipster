import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { MusifySharedModule } from 'app/shared/shared.module';
import { MusifyCoreModule } from 'app/core/core.module';
import { MusifyAppRoutingModule } from './app-routing.module';
import { MusifyHomeModule } from './home/home.module';
import { MusifyEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    MusifySharedModule,
    MusifyCoreModule,
    MusifyHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    MusifyEntityModule,
    MusifyAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class MusifyAppModule {}
