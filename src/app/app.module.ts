import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {MatButtonModule} from '@angular/material/button';
import { SingleSelectComponent } from './components/single-select/regions-ui-single-select.component';
import { MultiSelectComponent } from './components/multi-select/regions-ui-multi-select.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegionsService } from './services/regions.service';
import { RegionsStore } from './stores/regions-ui-store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    SingleSelectComponent,
    MultiSelectComponent,
    StoreModule.forRoot({}, {}),
  ],
  providers: [RegionsService, RegionsStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
