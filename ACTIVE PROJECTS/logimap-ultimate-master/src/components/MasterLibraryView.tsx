import React, { useState, useMemo } from 'react';
import { ShortcutLibrary, Shortcut } from '../types';
import { Book, Search, X } from '../icons';

interface MasterLibraryViewProps {
  library: ShortcutLibrary;
  onClose: () => void;
}

export const MasterLibraryView: React.FC<MasterLibraryViewProps> = ({ library, onClose }) => {
  const [search, setSearch] = useState("");

  const allShortcuts = useMemo(() => {
    const list: (Shortcut & { app: string })[] = [];
    Object.keys(library).forEach(app => {
      library[app].forEach(sc => list.push({ ...sc, app }));
    });
    return list;
  }, [library]);

  const filtered = allShortcuts.filter(sc =>
    sc.label.toLowerCase().includes(search.toLowerCase()) ||
    sc.keys.toLowerCase().includes(search.toLowerCase()) ||
    sc.app.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col">
      <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Book className="text-blue-500" />
          Master Shortcut Library
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full">
          <X size={24} />
        </button>
      </div>

      <div className="p-6 border-b border-slate-800 bg-slate-900/50">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-3.5 text-slate-500" />
          <input
            autoFocus
            type="text"
            placeholder="Search 150+ shortcuts across all apps..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((sc, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-blue-500/50 transition-colors group"
            >
              <div className="text-xs font-bold text-slate-500 uppercase mb-1 tracking-wide">
                {sc.app}
              </div>
              <div className="text-lg font-medium text-slate-200 mb-2 group-hover:text-white">
                {sc.label}
              </div>
              <div className="inline-block bg-slate-800 px-2 py-1 rounded text-sm font-mono text-blue-400 border border-slate-700">
                {sc.keys}
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No shortcuts found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
};
