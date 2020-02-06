// Copyright(C) 2019, CERN
// This software is distributed under the terms of the GNU General Public
// Licence version 3(GPL Version 3), copied verbatim in the file "LICENSE".
// In applying this license, CERN does not waive the privileges and immunities
// granted to it by virtue of its status as Intergovernmental Organization
// or submit itself to any jurisdiction.

import { HeaderBannerComponent } from './Components/header-banner/header-banner.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// used material modules
import { MaterialComponentsModule } from './Modules/MaterialModules/material-components/material-components.module';

// custom services
import { ServiceProvidersModule } from './Modules/ServiceProviders/service-providers/service-providers.module';

// custom components
import { PagesModule } from './Modules/ComponentModules/pages/pages.module';

@NgModule({
   declarations: [
      AppComponent,
      HeaderBannerComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MaterialComponentsModule,
      HttpClientModule,
      AppRoutingModule,
      ServiceProvidersModule,
      PagesModule,
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
