/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-rose-100/70 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single element brand wordmark */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-serif font-semibold tracking-tight text-neutral-900 hover:text-rose-900 transition-colors whitespace-nowrap shrink-0"
        >
          Larissa Rosa <span className="font-light italic text-rose-600">Beauty</span>
        </a>

        {/* Zone 2: Clean single-line text links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <a
            href="#sobre"
            className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0"
          >
            Sobre
          </a>
          <a
            href="#trabalho"
            className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0"
          >
            Meu Trabalho
          </a>
          <a
            href="#servicos"
            className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0"
          >
            Serviços
          </a>
          <a
            href="#contato"
            className="hover:text-rose-700 transition-colors whitespace-nowrap shrink-0"
          >
            Contato
          </a>
        </nav>

        {/* Zone 3: 1 primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-rose-700 rounded-full hover:bg-rose-800 active:scale-95 transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Agendar Atendimento</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-700 hover:bg-rose-50 hover:text-rose-700 transition-colors"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 px-6 py-5 shadow-lg">
          <nav className="flex flex-col gap-4 text-base font-medium text-neutral-700">
            <a
              href="#sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-rose-700 transition-colors"
            >
              Sobre
            </a>
            <a
              href="#trabalho"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-rose-700 transition-colors"
            >
              Meu Trabalho
            </a>
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-rose-700 transition-colors"
            >
              Serviços
            </a>
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-rose-700 transition-colors"
            >
              Contato
            </a>
            <div className="pt-3 border-t border-rose-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-white bg-rose-700 rounded-full hover:bg-rose-800 transition-colors"
              >
                Agendar Atendimento
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
