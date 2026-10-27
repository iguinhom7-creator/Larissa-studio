/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Instagram, Mail, MessageCircle, ArrowRight, Video, User, Box } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData.ts';
import { ThreeRoseJewel } from './ThreeRoseJewel.tsx';
import { PresentationVideo } from './PresentationVideo.tsx';

interface HeroProps {
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWhatsApp }) => {
  const [activeMediaView, setActiveMediaView] = useState<'video' | 'portrait' | 'threejs'>('video');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 border-b border-rose-100/60 bg-gradient-to-b from-rose-50/25 via-white to-white">
      {/* Decorative ambient rose blur behind hero */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand & Presentation */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Clean unboxed kicker (no pill boxes) */}
            <div className="flex items-center gap-2 text-xs font-medium text-rose-800 tracking-wider uppercase">
              <span>Lash Design</span>
              <span aria-hidden="true">·</span>
              <span>Sobrancelhas</span>
              <span aria-hidden="true">·</span>
              <span>Unhas</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-neutral-900 leading-[1.12]">
              Larissa Rosa <br />
              <span className="font-light italic text-rose-600">Beauty Designer</span>
            </h1>

            {/* Objective, verified bio text */}
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-xl">
              Atendimento especializado em realce do olhar, extensão de cílios, design e micropigmentação de sobrancelhas e cuidados para unhas.
            </p>

            {/* Quick Access Buttons requested in Topo */}
            <div className="w-full pt-2 flex flex-wrap items-center gap-3">
              {/* Instagram direct */}
              <a
                href={PROFILE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-800 bg-white border border-rose-200/80 rounded-full hover:bg-rose-50 hover:text-rose-900 hover:border-rose-300 transition-all shadow-xs"
              >
                <Instagram className="w-4 h-4 text-rose-600" />
                <span>Instagram</span>
              </a>

              {/* WhatsApp direct trigger */}
              <button
                onClick={onOpenWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-600 rounded-full hover:bg-emerald-700 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              {/* Email direct */}
              <a
                href={`mailto:${PROFILE_INFO.email}?subject=Contato%20-%20Larissa%20Rosa%20Beauty`}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-800 bg-white border border-rose-200/80 rounded-full hover:bg-rose-50 hover:text-rose-900 hover:border-rose-300 transition-all shadow-xs"
              >
                <Mail className="w-4 h-4 text-rose-600" />
                <span>E-mail</span>
              </a>
            </div>

            {/* Objective status note with clean typographic format */}
            <div className="pt-2 flex items-center gap-3 text-xs text-neutral-500">
              <span className="font-medium text-neutral-800">Horários sob agendamento</span>
              <span aria-hidden="true">·</span>
              <span>Atendimento exclusivo e individualizado</span>
            </div>
          </div>

          {/* Right Column: Visual Showcase (Video Presentation / Photo / Three.js 3D Emblem) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Segmented Mode Selector with Presentation Video as first choice */}
            <div className="mb-4 inline-flex items-center p-1 bg-rose-50/80 rounded-full border border-rose-200/60 shadow-xs">
              <button
                onClick={() => setActiveMediaView('video')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  activeMediaView === 'video'
                    ? 'bg-rose-700 text-white shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-rose-900'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Vídeo Apresentação</span>
              </button>
              <button
                onClick={() => setActiveMediaView('portrait')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  activeMediaView === 'portrait'
                    ? 'bg-rose-700 text-white shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-rose-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Foto</span>
              </button>
              <button
                onClick={() => setActiveMediaView('threejs')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  activeMediaView === 'threejs'
                    ? 'bg-rose-700 text-white shadow-xs font-semibold'
                    : 'text-neutral-600 hover:text-rose-900'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D</span>
              </button>
            </div>

            {/* Media Container */}
            <div className="w-full max-w-xs sm:max-w-sm flex justify-center">
              {activeMediaView === 'video' && (
                <div className="w-full flex flex-col items-center">
                  <PresentationVideo className="w-full aspect-9/16 max-h-[480px]" />
                  <p className="mt-2 text-[11px] text-neutral-500 text-center">
                    Vídeo de apresentação oficial · Larissa Rosa Beauty
                  </p>
                </div>
              )}

              {activeMediaView === 'portrait' && (
                <div className="w-full relative group rounded-3xl overflow-hidden bg-rose-50/50 border border-rose-200/70 shadow-md">
                  <div className="aspect-square w-full overflow-hidden bg-neutral-100">
                    <img
                      src={PROFILE_INFO.portraitImage}
                      alt="Larissa Rosa - Beauty Designer"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
                    />
                  </div>
                  {/* Clean bottom signature caption */}
                  <div className="p-4 bg-white/95 border-t border-rose-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">Larissa Rosa</p>
                      <p className="text-xs text-rose-700 font-medium">Beauty Designer</p>
                    </div>
                    <a
                      href={PROFILE_INFO.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-neutral-500 hover:text-rose-700 flex items-center gap-1 transition-colors"
                    >
                      <span>@{PROFILE_INFO.instagramHandle}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {activeMediaView === 'threejs' && (
                <ThreeRoseJewel className="w-full aspect-square" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
