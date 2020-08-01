import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movieboard',
  templateUrl: './movieboard.component.html',
  styleUrls: ['../displaymovie.css'],
})
export class MovieboardComponent implements OnInit {
  MovieList;

  constructor(private movieservice: MovieService) {
    this.movieservice.pyMovieboard().subscribe(
      (data) => {
        if (data.status === false) {
        } else {
          this.MovieList = data.movieList;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
