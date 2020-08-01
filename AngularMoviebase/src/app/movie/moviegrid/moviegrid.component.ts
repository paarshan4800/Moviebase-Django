import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { MatDialog } from '@angular/material/dialog';
import { MoviedialogComponent } from '../moviedialog/moviedialog.component';

@Component({
  selector: 'app-moviegrid',
  templateUrl: './moviegrid.component.html',
  styleUrls: ['./moviegrid.component.css'],
})
export class MoviegridComponent implements OnInit {
  @Input() MovieList: string;
  movieAlreadyLiked : boolean;
  dialogButtonMsg: string;
  dialogButtonIcon: string;

  constructor(private movieservice: MovieService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(data, dialogButtonMsg, dialogButtonIcon, movieAlreadyLiked) {
    this.dialog.open(MoviedialogComponent, {
      data: {
        movie: data,
        dialogButtonMsg: dialogButtonMsg,
        dialogButtonIcon: dialogButtonIcon,
        movieAlreadyLiked:movieAlreadyLiked
      },
      backdropClass: 'dialogBG',
      autoFocus: false
    });
  }

  ClickedMovieGrid(id: string) {
    this.movieservice.pyMovieLikedOrNot({ imdbID: id }).subscribe(
      (data) => {
        console.log(data);
        if (data.status === true) {
          this.movieAlreadyLiked = true;
          this.dialogButtonMsg = 'Remove From Liked Movies';
          this.dialogButtonIcon = 'delete';
        } else {
          this.movieAlreadyLiked = false;
          this.dialogButtonMsg = 'Add to Liked Movies';
          this.dialogButtonIcon = 'favorite';
        }
      },
      (error) => {
        console.log(error,"ERROR MOVIE L IEKD")
      }
    );
    this.movieservice.omdbGetMovie(id).subscribe((data) => {
      this.openDialog(data, this.dialogButtonMsg, this.dialogButtonIcon,this.movieAlreadyLiked);
    });
  }
}
