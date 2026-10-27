/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData.ts';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-16 sm:py-20 bg-white border-b border-rose-100/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title & subtle line */}
        <div className="flex flex-col items-center text-center space-y-4">
          <span className="text-xs font-semibold tracking-wider uppercase text-rose-700">
            Apresentação Profissional
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 tracking-tight">
            Sobre Larissa Rosa
          </h2>
          <div className="w-12 h-0.5 bg-rose-400/80 rounded-full" />
        </div>

        {/* Short, professional bio based solely on real Instagram details */}
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
            Larissa Rosa é especialista em estética facial com atuação em{' '}
            <strong className="text-neutral-900 font-semibold">Lash Design</strong> (extensões de cílios),{' '}
            <strong className="text-neutral-900 font-semibold">design e micropigmentação de sobrancelhas</strong> e{' '}
            <strong className="text-neutral-900 font-semibold">cuidados para unhas</strong>.
          </p>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
            Seu foco é a entrega de procedimentos precisos, respeitando a anatomia natural de cada cliente com biossegurança e produtos de alto padrão.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 hover:text-rose-900 transition-colors"
            >
              <span>Assistir ao vídeo de apresentação no topo</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>

        {/* 3 Pillars of work (clean unboxed cards with hairline borders) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-50/60 border border-rose-100/80 hover:border-rose-200 transition-colors">
            <h3 className="text-sm font-semibold text-neutral-900">Técnica Individualizada</h3>
            <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
              Mapeamento personalizado para alinhar o procedimento ao formato dos seus olhos e traços do rosto.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50/60 border border-rose-100/80 hover:border-rose-200 transition-colors">
            <h3 className="text-sm font-semibold text-neutral-900">Materiais Selecionados</h3>
            <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
              Utilização de insumos com certificação, fios hipoalergênicos e pigmentos estáveis.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50/60 border border-rose-100/80 hover:border-rose-200 transition-colors">
            <h3 className="text-sm font-semibold text-neutral-900">Ambiente Higienizado</h3>
            <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
              Protocolos rigorosos de esterilização e conforto para uma experiência tranquila durante o atendimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
