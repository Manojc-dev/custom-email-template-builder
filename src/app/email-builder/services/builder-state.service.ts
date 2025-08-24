import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmailComponent, PaletteItem } from '../models/email-component.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class BuilderStateService {
  // BehaviorSubject to hold the array of components on the canvas
  private readonly components$$ = new BehaviorSubject<EmailComponent[]>([]);
  // BehaviorSubject to hold the currently selected component for the property editor
  private readonly selectedComponent$$ = new BehaviorSubject<EmailComponent | null>(null);

  // Public observables for components to subscribe to
  public readonly components$: Observable<EmailComponent[]> = this.components$$.asObservable();
  public readonly selectedComponent$: Observable<EmailComponent | null> = this.selectedComponent$$.asObservable();

  constructor() {}

  /**
   * Adds a new component to the canvas at a specific index.
   * @param paletteItem The item dragged from the palette.
   * @param insertIndex The index where the new component should be inserted.
   */
  addComponent(paletteItem: PaletteItem, insertIndex: number): void {
    const newComponent: EmailComponent = {
      id: `etb_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      type: paletteItem.type,
      properties: { ...paletteItem.defaultProperties }, // Create a copy of default properties
    };

    const currentComponents = [...this.components$$.getValue()];
    currentComponents.splice(insertIndex, 0, newComponent);

    this.components$$.next(currentComponents);
    this.selectComponent(newComponent.id); // Auto-select the new component
  }

  /**
   * Reorders a component within the canvas.
   * @param previousIndex The original index of the item.
   * @param currentIndex The new index of the item.
   */
  reorderComponent(previousIndex: number, currentIndex: number): void {
    const currentComponents = [...this.components$$.getValue()];
    moveItemInArray(currentComponents, previousIndex, currentIndex);
    this.components$$.next(currentComponents);
  }

  /**
   * Selects a component to be edited in the property editor.
   * @param componentId The ID of the component to select.
   */
  selectComponent(componentId: string | null): void {
    if (!componentId) {
      this.selectedComponent$$.next(null);
      return;
    }
    const component = this.components$$.getValue().find((c) => c.id === componentId);
    this.selectedComponent$$.next(component || null);
  }

  /**
   * Updates the properties of a specific component.
   * @param componentId The ID of the component to update.
   * @param newProperties A partial object of properties to update.
   */
  updateComponentProperties(componentId: string, newProperties: Partial<EmailComponent['properties']>): void {
    const currentComponents = this.components$$.getValue().map((c) => {
      if (c.id === componentId) {
        return {
          ...c,
          properties: { ...c.properties, ...newProperties },
        };
      }
      return c;
    });

    this.components$$.next(currentComponents);

    // Also update the selected component observable if it's the one being edited
    if (this.selectedComponent$$.getValue()?.id === componentId) {
      const updatedSelected = currentComponents.find(c => c.id === componentId);
      this.selectedComponent$$.next(updatedSelected || null);
    }
  }

  /**
   * Exports the current canvas components to a clean HTML string.
   * @returns A string containing the generated HTML.
   */
  exportToHtml(): string {
    const components = this.components$$.getValue();
    if (components.length === 0) {
      return '<p>Template is empty.</p>';
    }

    const bodyContent = components.map(component => {
      const props = component.properties;
      switch (component.type) {
        case 'text':
          return `<div style="padding: 10px; text-align: ${props['align']}; font-size: ${props['fontSize']}px; color: ${props['color']};">
            ${props['content']}
          </div>`;
        case 'image':
          return `<div style="text-align: center; padding: 10px;">
            <img src="${props['src']}" alt="${props['alt']}" width="${props['width']}%" style="max-width: 100%; height: auto;" />
          </div>`;
        case 'button':
          return `<div style="text-align: center; padding: 10px;">
            <a href="${props['url']}" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: ${props['textColor']}; background-color: ${props['backgroundColor']}; text-decoration: none; border-radius: 5px;">
              ${props['text']}
            </a>
          </div>`;
        case 'divider':
          return `<div style="padding: 5px 10px;">
            <hr style="border: 0; border-top: ${props['thickness']}px ${props['style']} ${props['color']};" />
          </div>`;
        case 'spacer':
          return `<div style="height: ${props['height']}px;"></div>`;
        default:
          return '';
      }
    }).join('\n');

    // Basic responsive email template wrapper
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Email</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: sans-serif; background-color: #f4f4f4;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; margin: 20px auto; background-color: #ffffff;">
                  <tr>
                    <td>
                      ${bodyContent}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  }
}