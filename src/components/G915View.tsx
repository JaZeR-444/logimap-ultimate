import React from 'react';
import { Mappings } from '../types';
import { DeviceButton } from './DeviceButton';

interface G915ViewProps {
  profile: 'm1' | 'm2' | 'm3';
  mappings: Mappings;
  activeBtn: string | null;
  onBtnClick: (id: string) => void;
}

export const G915View: React.FC<G915ViewProps> = ({ profile, mappings, activeBtn, onBtnClick }) => {
  const gKeys = [
    { id: 'g1', style: { top: '15%', left: '20px' } },
    { id: 'g2', style: { top: '30%', left: '20px' } },
    { id: 'g3', style: { top: '45%', left: '20px' } },
    { id: 'g4', style: { top: '60%', left: '20px' } },
    { id: 'g5', style: { top: '75%', left: '20px' } }
  ];

  return (
    <div className="relative w-[600px] h-[300px] glass-panel rounded-xl mx-auto overflow-hidden transition-all select-none shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 opacity-90"></div>
      <div className="absolute top-4 left-8 flex space-x-2">
        {(['m1', 'm2', 'm3'] as const).map(m => (
          <div
            key={m}
            className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
              profile === m ? 'bg-yellow-400 text-black' : 'bg-slate-800 text-slate-500'
            }`}
          >
            {m.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-slate-900/50 border-r border-slate-700"></div>
      {gKeys.map(key => {
        const uniqueId = `${profile}-${key.id}`;
        return (
          <DeviceButton
            key={uniqueId}
            id={uniqueId}
            label={key.id.toUpperCase()}
            style={{ ...key.style, width: '50px', height: '40px', borderRadius: '4px' }}
            active={activeBtn === uniqueId}
            assignedShortcut={mappings[uniqueId]}
            onClick={onBtnClick}
            className="!bg-slate-800 !border-slate-600 !text-white"
          />
        );
      })}
      <div className="absolute bottom-2 right-4 text-xs text-slate-500">
        Logitech G915 Lightspeed
      </div>
    </div>
  );
};
