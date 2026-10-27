/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Instagram, Mail, MessageCircle, MapPin, Copy, Check, ArrowUpRight, ExternalLink, Settings } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData.ts';

interface ContactSectionProps {
  onOpenWhatsApp: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenWhatsApp }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  // Google Meu Negocio link state
  const [googleLink, setGoogleLink] = useState<string>(() => {
    return localStorage.getItem('larissa_google_business_link') || '';
  });
  const [isEditingGoogle, setIsEditingGoogle] = useState(false);
  const [tempGoogleLink, setTempGoogleLink] = useState(googleLink);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSaveGoogle = () => {
    setGoogleLink(tempGoogleLink);
    localStorage.setItem('larissa_google_business_link', tempGoogleLink);
    setIsEditingGoogle(false);
  };

  return (
    <section id="contato" className="py-16 sm:py-24 bg-gradient-to-b from-white to-rose-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-rose-700">
            Canais de Atendimento
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight mt-1">
            Entre em Contato
          </h2>
          <p className="text-sm text-neutral-600 mt-2">
            Escolha o canal de sua preferência para agendar seu procedimento ou tirar dúvidas.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* 1. Instagram Card */}
          <div className="p-7 rounded-3xl bg-white border border-rose-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-xs">
                <Instagram className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-neutral-900 mt-5">
                Instagram
              </h3>
              <p className="text-xs font-semibold text-rose-700 mt-1">
                @{PROFILE_INFO.instagramHandle}
              </p>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Acompanhe fotos diárias de atendimentos, novidades e envie mensagens diretas pelo perfil oficial.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-100">
              <a
                href={PROFILE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-full transition-colors cursor-pointer"
              >
                <span>Abrir Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2. WhatsApp Card */}
          <div className="p-7 rounded-3xl bg-white border border-rose-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-neutral-900 mt-5">
                WhatsApp
              </h3>
              <p className="text-xs font-semibold text-emerald-700 mt-1">
                Atendimento Direto & Agendamento
              </p>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Canal ideal para verificar horários livres na agenda e tirar dúvidas sobre procedimentos.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-100">
              <button
                onClick={onOpenWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors cursor-pointer shadow-xs"
              >
                <span>Iniciar Conversa no WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3. E-mail Card */}
          <div className="p-7 rounded-3xl bg-white border border-rose-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shadow-xs">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-neutral-900 mt-5">
                E-mail Profissional
              </h3>
              <p className="text-xs font-medium text-neutral-800 break-all mt-1">
                {PROFILE_INFO.email}
              </p>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                Para parcerias, orçamentos específicos e contato formal.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-100 flex gap-2">
              <a
                href={`mailto:${PROFILE_INFO.email}?subject=Contato%20-%20Larissa%20Rosa%20Beauty`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 text-xs font-semibold uppercase tracking-wider text-white bg-rose-700 hover:bg-rose-800 rounded-full transition-colors text-center"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Enviar E-mail</span>
              </a>
              <button
                onClick={handleCopyEmail}
                title="Copiar endereço de e-mail"
                className="p-3 rounded-full border border-rose-200 text-neutral-600 hover:text-rose-900 hover:bg-rose-50 transition-colors"
                aria-label="Copiar e-mail"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* 4. Google Meu Negócio Card (Preparado) */}
          <div className="p-7 rounded-3xl bg-white border border-rose-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-neutral-900 mt-5">
                Google Meu Negócio
              </h3>
              <p className="text-xs font-medium text-blue-700 mt-1">
                {googleLink ? 'Localização & Avaliações' : 'Em fase de ativação cadastral'}
              </p>
              <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                {googleLink
                  ? 'Veja localização no mapa, rotas e avaliações de clientes atendidas.'
                  : 'Espaço preparado para inserir o link oficial da ficha do Google da Larissa Rosa.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-100">
              {isEditingGoogle ? (
                <div className="space-y-2">
                  <input
                    type="url"
                    placeholder="https://maps.google.com/..."
                    value={tempGoogleLink}
                    onChange={(e) => setTempGoogleLink(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-neutral-300 focus:border-rose-500 outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveGoogle}
                      className="px-3.5 py-1.5 text-xs font-medium text-white bg-rose-700 rounded-lg hover:bg-rose-800"
                    >
                      Salvar Link
                    </button>
                    <button
                      onClick={() => setIsEditingGoogle(false)}
                      className="px-2.5 py-1.5 text-xs text-neutral-500 hover:text-neutral-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : googleLink ? (
                <div className="flex items-center gap-2">
                  <a
                    href={googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
                  >
                    <span>Ver no Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => {
                      setTempGoogleLink(googleLink);
                      setIsEditingGoogle(true);
                    }}
                    title="Editar link do Google"
                    className="p-2.5 rounded-full border border-neutral-200 text-neutral-500 hover:text-neutral-800"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 italic">Link não informado ainda</span>
                  <button
                    onClick={() => setIsEditingGoogle(true)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-rose-700 hover:underline"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Inserir link</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
