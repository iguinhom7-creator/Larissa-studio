/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { SERVICES_ITEMS } from '../data/portfolioData.ts';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="servicos" className="py-16 sm:py-24 bg-white border-b border-rose-100/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-rose-700">
            Especialidades Confirmadas
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight mt-1">
            Serviços & Atendimentos
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Procedimentos realizados com técnica avançada, materiais de alta durabilidade e atenção minuciosa.
          </p>
        </div>

        {/* 3 Main Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES_ITEMS.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-7 rounded-3xl bg-neutral-50/50 border border-rose-100/80 hover:border-rose-300 hover:bg-rose-50/20 transition-all duration-300 shadow-2xs hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-neutral-900 mt-2">
                  {service.title}
                </h3>

                <p className="text-xs font-medium text-rose-800/80 mt-1">
                  {service.tagline}
                </p>

                <p className="text-xs text-neutral-600 mt-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Highlights */}
                <div className="mt-6 pt-5 border-t border-rose-100/80 space-y-2">
                  {service.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-rose-800 bg-white border border-rose-200/90 rounded-full hover:bg-rose-700 hover:text-white hover:border-rose-700 active:scale-98 transition-all cursor-pointer shadow-2xs"
                >
                  <span>Consultar Horários</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
