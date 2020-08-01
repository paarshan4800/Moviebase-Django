import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  MovieList;
  noMoviesFound: boolean;

  form = this.formBuilder.group({
    title: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private movieservice: MovieService
  ) {}

  ngOnInit(): void {
    this.noMoviesFound = false;
  }

  DisplayMovies() {
    this.movieservice
      .omdbSearchMovies(this.form.value.title)
      .subscribe((data) => {
        if (data.Response === 'False') {
          this.noMoviesFound = true;
        } else {
          this.noMoviesFound = false;
          this.MovieList = data.Search;
        }
      });
  }
}
