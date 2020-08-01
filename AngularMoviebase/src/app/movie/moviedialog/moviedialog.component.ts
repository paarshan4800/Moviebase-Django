import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieService } from '../movie.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { from } from 'rxjs';

@Component({
  selector: 'app-moviedialog',
  templateUrl: './moviedialog.component.html',
  styleUrls: ['./moviedialog.component.css'],
})
export class MoviedialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private movieservice: MovieService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  displaySnackBar(msg: any) {
    let snackbarRef = this.snackbar.open(msg, null, {
      duration: 3000,
      horizontalPosition:"left",
    });
  }

  clickedMovieActionButton(data: any) {
    if (data.alreadyLiked === true) {
      this.movieservice.pyRemoveFromLikedList(data.movieData).subscribe(
        (data) => {
          this.displaySnackBar(data.response);
        },
        (error) => {
          this.displaySnackBar(error);
        }
      );
    } else {
      this.movieservice.pyAddToLikedList(data.movieData).subscribe(
        (data) => {
          this.displaySnackBar(data.response);
        },
        (error) => {
          this.displaySnackBar(error);
        }
      );
    }

    // To refresh the page after removing/adding one movie
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.location.path())]);
    });
  }
}
