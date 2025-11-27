import React from 'react';
import { Shortcut } from '../types';

interface DeviceButtonProps {
  id: string;
  label: string;
  active: boolean;
  assignedShortcut?: Shortcut;
  onClick: (id: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export const DeviceButton: React.FC<DeviceButtonProps> = ({
  id,
  label,
  active,
  assignedShortcut,
  onClick,
  style,
  className = ""
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={`absolute flex flex-col items-center justify-center transition-all shadow-lg border-2 rounded-lg p-1 z-10 cursor-pointer hover:scale-105
        ${active ? 'bg-indigo-600 border-indigo-400 shadow-[0_0_10px_#4f46e5]' : 'bg-slate-900 border-slate-700'} ${className}
      `}
      style={style}
      title={assignedShortcut ? `${assignedShortcut.label} (${assignedShortcut.keys})` : label}
    >
      <span className="text-[9px] font-bold uppercase tracking-wider mb-0.5 text-slate-400">{label}</span>
      {assignedShortcut && (
        <div className="text-[8px] px-1 py-0.5 rounded font-mono text-center w-full overflow-hidden text-ellipsis whitespace-nowrap bg-slate-800 text-indigo-300">
          {assignedShortcut.keys}
        </div>
      )}
    </div>
  );
};
