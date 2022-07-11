import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopRatedPageRoutingModule } from './top-rated-routing.module';

import { TopRatedPage } from './top-rated.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopRatedPageRoutingModule
  ],
  declarations: [TopRatedPage]
})
export class TopRatedPageModule {}
