import React from 'react';
import { Mappings } from '../types';
import { DeviceButton } from './DeviceButton';

interface G502ViewProps {
  layer: 'std' | 'shift';
  mappings: Mappings;
  activeBtn: string | null;
  onBtnClick: (id: string) => void;
}

export const G502View: React.FC<G502ViewProps> = ({ layer, mappings, activeBtn, onBtnClick }) => {
  const buttons = [
    { id: 'lmb', label: 'L Click', style: { top: '5%', left: '30%', width: '60px', height: '80px', borderRadius: '10px 30px 0 0' } },
    { id: 'rmb', label: 'R Click', style: { top: '5%', right: '30%', width: '60px', height: '80px', borderRadius: '30px 10px 0 0' } },
    { id: 'mmb', label: 'Mid', style: { top: '5%', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '50px' } },
    { id: 'g9', label: 'G9', style: { top: '22%', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '25px' } },
    { id: 'g8', label: 'G8', style: { top: '15%', left: '18%', width: '25px', height: '35px' } },
    { id: 'g7', label: 'G7', style: { top: '25%', left: '18%', width: '25px', height: '35px' } },
    { id: 'g5', label: 'G5', style: { top: '40%', left: '5%', width: '30px', height: '50px', borderRadius: '10px 0 0 10px' } },
    { id: 'g4', label: 'G4', style: { top: '55%', left: '5%', width: '30px', height: '50px', borderRadius: '10px 0 0 10px' } },
    { id: 'shift', label: 'Sniper', style: { top: '35%', left: '0%', width: '25px', height: '40px' } },
    { id: 'wl', label: 'Tilt L', style: { top: '2%', left: '45%', width: '15px', height: '20px' } },
    { id: 'wr', label: 'Tilt R', style: { top: '2%', right: '45%', width: '15px', height: '20px' } },
  ];

  return (
    <div className="relative w-[350px] h-[500px] glass-panel rounded-3xl mx-auto transition-all select-none shadow-2xl">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[400px] bg-slate-900 rounded-[50px] opacity-50 pointer-events-none border border-slate-700"></div>
      <div className="absolute top-4 right-4 text-xs font-mono text-slate-500 pointer-events-none">
        LAYER: {layer === 'std' ? 'Standard' : 'G-Shift'}
      </div>
      {buttons.map(btn => {
        const uniqueId = `${layer}-${btn.id}`;
        return (
          <DeviceButton
            key={uniqueId}
            id={uniqueId}
            label={btn.label}
            style={btn.style}
            active={activeBtn === uniqueId}
            assignedShortcut={mappings[uniqueId]}
            onClick={onBtnClick}
          />
        );
      })}
      <div className="absolute bottom-8 w-full text-center text-xs text-slate-500">
        Logitech G502 Lightspeed
      </div>
    </div>
  );
};
