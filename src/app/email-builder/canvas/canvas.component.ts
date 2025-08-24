import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { BuilderStateService } from '../services/builder-state.service';
import { PaletteItem } from '../models/email-component.model';
import { map } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'etb-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  standalone: true,
  imports: [DragDropModule, AsyncPipe, CommonModule, MatIconModule]
})
export class CanvasComponent implements OnInit {
  components$ : any;
  selectedComponentId$ : any;
Array: any;

  constructor(private builderStateService: BuilderStateService) {}

  
  ngOnInit(): void {
    this.components$ = this.builderStateService.components$;
    this.selectedComponentId$ = this.builderStateService.selectedComponent$.pipe(
      map(comp => comp?.id ?? null)
    );
  }

  onDrop(event: CdkDragDrop<any>): void {
    if (event.previousContainer === event.container) {
      // Reordering an existing component
      this.builderStateService.reorderComponent(event.previousIndex, event.currentIndex);
    } else {
      // Dropping a new component from the palette
      const paletteItem = event.previousContainer.data[event.previousIndex] as PaletteItem;
      this.builderStateService.addComponent(paletteItem, event.currentIndex);
    }
  }

  selectComponent(componentId: string): void {
    this.builderStateService.selectComponent(componentId);
  }
}