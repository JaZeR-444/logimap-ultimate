# LogiMap Ultimate

A React + TypeScript application for mapping keyboard shortcuts to your Logitech G502 mouse and G915 keyboard.

## Features

- **150+ Built-in Shortcuts**: Pre-configured shortcuts for popular apps including:
  - Productivity: Notion, Google Docs, Excel, Word, etc.
  - AI Tools: ChatGPT, Claude, Gemini
  - Development: VS Code, GitHub, CLI/Terminal
  - Creative: FL Studio, Canva
  - System: Windows, MacOS
  - And many more!

- **Device Support**:
  - Logitech G502 Lightspeed Mouse (with G-Shift layer support)
  - Logitech G915 Lightspeed Keyboard (with 3 profiles: M1, M2, M3)

- **Interactive UI**:
  - Visual device representations
  - Click buttons to assign shortcuts
  - Search and filter shortcuts
  - Master library view with all shortcuts

- **Persistent Storage**: Your mappings are automatically saved to localStorage

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Select Your Device**: Choose between Mouse (G502) or Keyboard (G915)
2. **Select an App**: Pick from the dropdown which application shortcuts you want to map
3. **Click a Device Button**: Click any button on the visual device representation
4. **Assign a Shortcut**: Click on a shortcut from the sidebar to assign it to the selected button
5. **Switch Layers/Profiles**: 
   - For G502: Toggle between Standard and G-Shift layers
   - For G915: Switch between M1, M2, and M3 profiles
6. **Browse All Shortcuts**: Click the Book icon to view the master library of all available shortcuts

## Tech Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Full type safety
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **LocalStorage**: Persistent data storage

## Project Structure

```
src/
├── components/
│   ├── DeviceButton.tsx      # Individual button component
│   ├── G502View.tsx           # G502 mouse visualization
│   ├── G915View.tsx           # G915 keyboard visualization
│   └── MasterLibraryView.tsx  # Full shortcut library view
├── data.ts                    # All shortcut definitions
├── icons.tsx                  # SVG icon components
├── types.ts                   # TypeScript type definitions
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles
```

## Contributing

Feel free to add more shortcuts to the `data.ts` file or enhance the device visualizations!

## License

MIT
