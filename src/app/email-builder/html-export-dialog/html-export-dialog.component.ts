import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogActions } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'etb-html-export-dialog',
  templateUrl: './html-export-dialog.component.html',
  styleUrls: ['./html-export-dialog.component.scss'],
  imports: [MatDialogContent, MatDialogActions, ClipboardModule],
})
export class HtmlExportDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { html: string },
    private snackBar: MatSnackBar
  ) {}

  notifyCopy(): void {
    this.snackBar.open('HTML copied to clipboard!', 'Close', { duration: 2000 });
  }
}