import React, { useState, useEffect } from 'react';
import { MASTER_DB } from './data';
import { Mappings, DeviceType, LayerType, ProfileType, ViewType, Shortcut } from './types';
import { Layers, Settings, Book, Search, Check } from './icons';
import { G502View } from './components/G502View';
import { G915View } from './components/G915View';
import { MasterLibraryView } from './components/MasterLibraryView';

function App() {
  const [library] = useState(MASTER_DB);
  const [mappings, setMappings] = useState<Mappings>({});
  const [currentView, setCurrentView] = useState<ViewType>("studio");
  const [selectedApp, setSelectedApp] = useState<string>(Object.keys(MASTER_DB)[0]);
  const [device, setDevice] = useState<DeviceType>('g502');
  const [layer, setLayer] = useState<LayerType>('std');
  const [profile, setProfile] = useState<ProfileType>('m1');
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedMap = localStorage.getItem('logimap_ult_map');
    if (savedMap) {
      try {
        setMappings(JSON.parse(savedMap));
      } catch (e) {
        console.error('Failed to load saved mappings', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('logimap_ult_map', JSON.stringify(mappings));
  }, [mappings]);

  const handleShortcutSelect = (sc: Shortcut) => {
    if (activeButton) {
      setMappings(prev => ({ ...prev, [activeButton]: sc }));
      setActiveButton(null);
    }
  };

  const filteredShortcuts = (library[selectedApp] || []).filter(sc =>
    sc.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sc.keys.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex overflow-hidden bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white relative">
      {/* NAVIGATION */}
      <nav className="w-20 bg-slate-900 border-r border-slate-800 flex flex-col items-center py-6 gap-6 shrink-0 z-30">
        <div className="mb-2 text-blue-500">
          <Layers size={32} />
        </div>
        <button
          onClick={() => setCurrentView("studio")}
          className={`p-3 rounded-xl transition-all ${
            currentView === "studio"
              ? "bg-slate-800 text-white shadow-lg"
              : "text-slate-500 hover:text-slate-200"
          }`}
        >
          <Settings size={24} />
        </button>
        <button
          onClick={() => setCurrentView("library")}
          className={`p-3 rounded-xl transition-all ${
            currentView === "library"
              ? "bg-blue-600 text-white shadow-lg"
              : "text-slate-500 hover:text-slate-200"
          }`}
          title="Master Library"
        >
          <Book size={24} />
        </button>
      </nav>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {currentView === 'studio' && (
          <>
            <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center px-6 justify-between shrink-0">
              <h1 className="font-bold text-lg">
                LogiMap <span className="text-blue-400">Ultimate</span>
              </h1>
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 p-1 bg-slate-800 rounded-lg border border-slate-700">
                  <button
                    onClick={() => setDevice('g502')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      device === 'g502'
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Mouse
                  </button>
                  <button
                    onClick={() => setDevice('g915')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      device === 'g915'
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Keyboard
                  </button>
                </div>
                <select
                  className="bg-slate-800 border border-slate-700 text-xs rounded p-2 outline-none focus:border-blue-500 w-48"
                  value={selectedApp}
                  onChange={e => setSelectedApp(e.target.value)}
                >
                  {Object.keys(library).map(k => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>
              </div>
            </header>

            <main className="flex-1 flex overflow-hidden relative">
              <aside className="w-80 border-r border-slate-800 bg-slate-900/30 flex flex-col">
                <div className="p-4 border-b border-slate-800">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <input
                      type="text"
                      placeholder="Filter current app..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                  {filteredShortcuts.map(sc => (
                    <div
                      key={sc.id}
                      onClick={() => handleShortcutSelect(sc)}
                      className={`group flex items-center justify-between p-3 rounded-lg border border-transparent cursor-pointer transition-all ${
                        activeButton
                          ? 'hover:bg-slate-800 hover:border-slate-700'
                          : 'opacity-50'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-200">
                          {sc.label}
                        </span>
                        <span className="text-xs text-slate-500 bg-slate-800/50 px-1.5 py-0.5 rounded mt-1 inline-block w-max font-mono">
                          {sc.keys}
                        </span>
                      </div>
                      {activeButton && (
                        <div className="text-blue-500 opacity-0 group-hover:opacity-100">
                          <Check size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </aside>

              <section className="flex-1 flex flex-col items-center justify-center bg-slate-950 relative p-10">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>

                {device === 'g502' ? (
                  <>
                    <div className="flex gap-2 mb-4 z-10">
                      <button
                        onClick={() => setLayer('std')}
                        className={`px-3 py-1 text-xs font-mono rounded border ${
                          layer === 'std'
                            ? 'border-slate-500 bg-slate-800'
                            : 'border-transparent opacity-50'
                        }`}
                      >
                        STD
                      </button>
                      <button
                        onClick={() => setLayer('shift')}
                        className={`px-3 py-1 text-xs font-mono rounded border ${
                          layer === 'shift'
                            ? 'border-slate-500 bg-slate-800'
                            : 'border-transparent opacity-50'
                        }`}
                      >
                        G-SHIFT
                      </button>
                    </div>
                    <G502View
                      layer={layer}
                      mappings={mappings}
                      activeBtn={activeButton}
                      onBtnClick={id => setActiveButton(id === activeButton ? null : id)}
                    />
                  </>
                ) : (
                  <>
                    <div className="flex gap-2 mb-4 z-10">
                      {(['m1', 'm2', 'm3'] as const).map(m => (
                        <button
                          key={m}
                          onClick={() => setProfile(m)}
                          className={`w-8 py-1 text-xs font-mono rounded border ${
                            profile === m
                              ? 'border-slate-500 bg-slate-800'
                              : 'border-transparent opacity-50'
                          }`}
                        >
                          {m.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    <G915View
                      profile={profile}
                      mappings={mappings}
                      activeBtn={activeButton}
                      onBtnClick={id => setActiveButton(id === activeButton ? null : id)}
                    />
                  </>
                )}
              </section>
            </main>
          </>
        )}

        {currentView === 'library' && (
          <MasterLibraryView library={library} onClose={() => setCurrentView("studio")} />
        )}
      </div>
    </div>
  );
}

export default App;
