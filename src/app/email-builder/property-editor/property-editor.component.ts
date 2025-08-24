import { Component } from '@angular/core';
import { BuilderStateService } from '../services/builder-state.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmailComponent } from '../models/email-component.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'etb-property-editor',
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.scss'],
  imports: [MatFormFieldModule, MatIconModule, MatSliderModule, MatInputModule, FormsModule, CommonModule, MatSelectModule, MatButtonModule, MatTooltipModule]
})
export class PropertyEditorComponent {
  selectedComponent$: Observable<EmailComponent | null>;

  constructor(private builderStateService: BuilderStateService) {
    this.selectedComponent$ = this.builderStateService.selectedComponent$;
  }

    /**
   * Updates a property of the currently selected component.
   * @param componentId The ID of the component being edited.
   * @param propertyName The name of the property to update.
   * @param event The event containing the new value
   */
  updateProperty(componentId: string, propertyName: string, event: Event | number): void {
    let newValue: any;
    
    if (typeof event === 'number') {
      newValue = event;
    } else {
      newValue = (event.target as HTMLInputElement).value;
    }

    if (newValue !== undefined) {
      this.builderStateService.updateComponentProperties(componentId, { [propertyName]: newValue });
    }
  }

  deselectComponent(): void {
    this.builderStateService.selectComponent(null);
  }

  displayPx(value: number): string {
  return value ? `${value}px` : '';
}

  displayPercent(value: number): string {
    return value ? `${value}%` : '';
  }

}