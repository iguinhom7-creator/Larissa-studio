/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp, Instagram, Mail, MessageCircle } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData.ts';

interface FooterProps {
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWhatsApp }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-rose-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-serif font-bold text-neutral-900 tracking-tight">
              Larissa Rosa <span className="font-light italic text-rose-600">Beauty</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Lash Designer · Micropigmentação · Cuidados de Beleza
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-neutral-500 text-xs">
            <a
              href={PROFILE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-rose-50 hover:text-rose-700 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={onOpenWhatsApp}
              className="p-2 rounded-full hover:bg-rose-50 hover:text-emerald-600 transition-colors cursor-pointer"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className="p-2 rounded-full hover:bg-rose-50 hover:text-rose-700 transition-colors"
              aria-label="E-mail"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top & copyright */}
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <span>© {new Date().getFullYear()} Larissa Rosa Beauty</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-neutral-600 hover:text-rose-700 transition-colors cursor-pointer"
            >
              <span>Topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
