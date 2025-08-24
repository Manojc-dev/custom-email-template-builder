import { Component } from '@angular/core';
import { PaletteItem } from '../models/email-component.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'etb-component-palette',
  templateUrl: './component-palette.component.html',
  styleUrls: ['./component-palette.component.scss'],
  imports: [
    CommonModule,
    MatListModule,
    DragDropModule,
    MatIconModule
]
})
export class ComponentPaletteComponent {
  // Define the available components for the palette.
  // This is easily extensible. Just add a new object to this array.
  paletteItems: PaletteItem[] = [
    {
      type: 'text',
      name: 'Text',
      icon: 'text_fields',
      defaultProperties: { content: 'This is a text block. Click to edit.', fontSize: 16, color: '#000000', align: 'left' },
    },
    {
      type: 'image',
      name: 'Image',
      icon: 'image',
      defaultProperties: { src: 'https://via.placeholder.com/300x150', alt: 'Placeholder Image', width: 100 },
    },
    {
      type: 'button',
      name: 'Button',
      icon: 'smart_button',
      defaultProperties: { text: 'Click Me', url: '#', backgroundColor: '#3f51b5', textColor: '#ffffff' },
    },
    {
      type: 'divider',
      name: 'Divider',
      icon: 'horizontal_rule',
      defaultProperties: { thickness: 1, style: 'solid', color: '#cccccc' },
    },
    {
      type: 'spacer',
      name: 'Spacer',
      icon: 'height',
      defaultProperties: { height: 20 },
    },
  ];
}