// Defines the structure for a component's editable properties.
// Using an index signature allows for flexible, component-specific properties.
export interface ComponentProperties {
  [key: string]: any;
}

// Defines the main structure for a component on the canvas.
export interface EmailComponent {
  id: string; // Unique identifier for each component instance
  type: 'text' | 'image' | 'button' | 'divider' | 'spacer'; // The type of component
  properties: ComponentProperties;
}

// Defines the structure for an item in the component palette.
export interface PaletteItem {
  type: EmailComponent['type'];
  name: string;
  icon: string;
  defaultProperties: ComponentProperties;
}