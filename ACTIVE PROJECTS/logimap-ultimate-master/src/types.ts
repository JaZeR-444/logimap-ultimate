export interface Shortcut {
  id: string;
  label: string;
  keys: string;
}

export interface ShortcutLibrary {
  [appName: string]: Shortcut[];
}

export interface Mappings {
  [buttonId: string]: Shortcut;
}

export type DeviceType = 'g502' | 'g915';
export type LayerType = 'std' | 'shift';
export type ProfileType = 'm1' | 'm2' | 'm3';
export type ViewType = 'studio' | 'library';
