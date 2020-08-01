import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MovieRoutingModule} from './movie-routing.module';
import { HomepageComponent } from './homepage/homepage.component'
import {MaterialModule} from '../material/material.module';
import { SearchComponent } from './search/search.component';
import { LikedmoviesComponent } from './likedmovies/likedmovies.component';
import { MovieboardComponent } from './movieboard/movieboard.component'
import { ReactiveFormsModule } from '@angular/forms';
import { MoviegridComponent } from './moviegrid/moviegrid.component';
import {ScrollingModule} from '@angular/cdk/scrolling'
import { from } from 'rxjs';
import { MoviedialogComponent } from './moviedialog/moviedialog.component';
import { NomovieslikeddialogComponent } from './nomovieslikeddialog/nomovieslikeddialog.component';


@NgModule({
  declarations: [HomepageComponent, SearchComponent, LikedmoviesComponent, MovieboardComponent, MoviegridComponent, MoviedialogComponent, NomovieslikeddialogComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ScrollingModule
  ]
})
export class MovieModule { }