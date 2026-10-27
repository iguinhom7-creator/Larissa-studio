/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PortfolioItem } from '../types.ts';

interface LightboxModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    if (item) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar controls */}
        <div className="w-full flex items-center justify-between py-3 text-white">
          <div className="flex items-center gap-2 text-xs text-rose-200">
            <span>{item.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Larissa Rosa Beauty</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Fechar visualizador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Frame */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl flex items-center justify-center max-h-[75vh]">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain max-h-[75vh] select-none"
          />

          {/* Navigation Arrows */}
          <button
            onClick={onPrev}
            className="absolute left-3 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-3 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white transition-colors"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption */}
        <div className="w-full mt-3 px-2 flex items-center justify-between text-white">
          <div>
            <h4 className="text-sm font-medium tracking-tight">{item.title}</h4>
            <p className="text-xs text-neutral-400 mt-0.5">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
