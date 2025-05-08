import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-6">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
    </div>
  );
}