import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuilderStateService } from './services/builder-state.service';
import { HtmlExportDialogComponent } from './html-export-dialog/html-export-dialog.component';
import { MatIconModule } from "@angular/material/icon";
import { ComponentPaletteComponent } from "./component-palette/component-palette.component";
import { CanvasComponent } from "./canvas/canvas.component";
import { PropertyEditorComponent } from "./property-editor/property-editor.component";

@Component({
  selector: 'etb-email-builder',
  templateUrl: './email-builder.component.html',
  styleUrls: ['./email-builder.component.scss'],
  imports: [MatIconModule, ComponentPaletteComponent, CanvasComponent, PropertyEditorComponent]
})

export class EmailBuilderComponent {
  constructor(
    private builderStateService: BuilderStateService,
    private dialog: MatDialog
  ) {}

  exportHtml(): void {
    const html = this.builderStateService.exportToHtml();
    this.dialog.open(HtmlExportDialogComponent, {
      width: '80%',
      data: { html },
    });
  }
}

// export interface EmailBuilderComponent {
//   id: string;
//   type: string;
//   properties: {
//     height?: number;
//     width?: number;
//     color?: string;
//     [key: string]: any;   // allow flexibility for other properties
//   };
// }