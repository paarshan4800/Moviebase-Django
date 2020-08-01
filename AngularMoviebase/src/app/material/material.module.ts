import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule, MatToolbar} from '@angular/material/toolbar'
import { from } from 'rxjs';

const MaterialComponents = [
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
  MatToolbarModule
];

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModule {}
