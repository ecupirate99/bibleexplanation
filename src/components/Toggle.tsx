import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      className={`relative inline-flex h-9 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? 'bg-blue-700' : 'bg-gray-200'
      }`}
      onClick={() => onChange(!enabled)}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`${
          enabled ? 'translate-x-9' : 'translate-x-1'
        } inline-block h-7 w-7 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out`}
      >
        {enabled ? (
          <Moon className="h-5 w-5 m-1 text-blue-700" />
        ) : (
          <Sun className="h-5 w-5 m-1 text-yellow-500" />
        )}
      </span>
    </button>
  );
}