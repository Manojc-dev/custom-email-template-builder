import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { EmailBuilderComponent } from './email-builder/email-builder.component';
import { PropertyEditorComponent } from './email-builder/property-editor/property-editor.component';
import { CanvasComponent } from './email-builder/canvas/canvas.component';
import { ComponentPaletteComponent } from './email-builder/component-palette/component-palette.component';
import { MatIconModule } from '@angular/material/icon';
import { HtmlExportDialogComponent } from './email-builder/html-export-dialog/html-export-dialog.component';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmailBuilderComponent,
    MatIconModule,
    ComponentPaletteComponent,
    CanvasComponent,
    PropertyEditorComponent,
    HtmlExportDialogComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
