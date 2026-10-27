/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData.ts';
import { PortfolioItem } from '../types.ts';

interface PortfolioCarouselProps {
  onSelectItem: (item: PortfolioItem) => void;
}

type FilterCategory = 'todos' | 'cilios' | 'sobrancelhas' | 'unhas' | 'estudio';

export const PortfolioCarousel: React.FC<PortfolioCarouselProps> = ({ onSelectItem }) => {
  const [filter, setFilter] = useState<FilterCategory>('todos');
  const carouselRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    filter === 'todos'
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === filter);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const cardWidth = 360;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section id="trabalho" className="py-16 sm:py-24 bg-neutral-50/40 border-b border-rose-100/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-700">
              Galeria Visual
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight mt-1">
              Meu Trabalho
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-md">
              Registros reais de atendimentos em cílios, sobrancelhas e cuidados estéticos.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-full bg-white border border-rose-200/80 text-neutral-700 hover:text-rose-900 hover:bg-rose-50 active:scale-95 transition-all shadow-2xs"
              aria-label="Rolar fotos para esquerda"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-full bg-white border border-rose-200/80 text-neutral-700 hover:text-rose-900 hover:bg-rose-50 active:scale-95 transition-all shadow-2xs"
              aria-label="Rolar fotos para direita"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-rose-100 shadow-2xs overflow-x-auto mb-8 max-w-fit">
          <button
            onClick={() => setFilter('todos')}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'todos'
                ? 'bg-rose-700 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-rose-50/60'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('cilios')}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'cilios'
                ? 'bg-rose-700 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-rose-50/60'
            }`}
          >
            Cílios (Lash)
          </button>
          <button
            onClick={() => setFilter('sobrancelhas')}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'sobrancelhas'
                ? 'bg-rose-700 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-rose-50/60'
            }`}
          >
            Sobrancelhas
          </button>
          <button
            onClick={() => setFilter('unhas')}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'unhas'
                ? 'bg-rose-700 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-rose-50/60'
            }`}
          >
            Unhas
          </button>
          <button
            onClick={() => setFilter('estudio')}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'estudio'
                ? 'bg-rose-700 text-white shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-rose-50/60'
            }`}
          >
            Espaço
          </button>
        </div>

        {/* Carousel Container with smooth native momentum scrolling */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth scrollbar-none focus:outline-none"
          tabIndex={0}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="snap-start shrink-0 w-[290px] sm:w-[350px] group cursor-pointer bg-white rounded-3xl overflow-hidden border border-rose-100/90 hover:border-rose-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Photo Area */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-rose-50/40">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />

                {/* Subtle hover icon */}
                <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/90 text-neutral-800 shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Card Meta & Clean Unboxed Description */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-rose-700 font-medium">
                    <span>{item.categoryLabel}</span>
                    <span aria-hidden="true" className="text-rose-300">·</span>
                    <span className="text-neutral-500 font-normal">Larissa Rosa Beauty</span>
                  </div>
                  <h3 className="mt-1.5 text-base font-semibold text-neutral-900 group-hover:text-rose-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between text-xs text-neutral-500">
                  <span className="group-hover:text-rose-700 transition-colors font-medium">
                    Toque para ampliar
                  </span>
                  <Maximize2 className="w-3.5 h-3.5 text-neutral-400 group-hover:text-rose-600 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe hint for mobile */}
        <div className="mt-4 text-center text-xs text-neutral-400 sm:hidden">
          ← Deslize para ver mais trabalhos →
        </div>
      </div>
    </section>
  );
};
