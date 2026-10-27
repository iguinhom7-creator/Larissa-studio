/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Send, Copy, Check, MessageCircle, Settings, Sparkles } from 'lucide-react';
import { PROFILE_INFO } from '../data/portfolioData.ts';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  serviceTitle,
}) => {
  // Stored WhatsApp number if set
  const [phoneNumber, setPhoneNumber] = useState<string>(() => {
    return localStorage.getItem('larissa_whatsapp_number') || '';
  });
  const [isEditingNumber, setIsEditingNumber] = useState(false);
  const [tempNumber, setTempNumber] = useState(phoneNumber);
  const [copied, setCopied] = useState(false);

  const defaultMessage = serviceTitle
    ? `Olá Larissa! Conheci seu trabalho pelo site e gostaria de consultar horários para ${serviceTitle}.`
    : PROFILE_INFO.defaultWhatsAppMessage;

  const [message, setMessage] = useState(defaultMessage);

  useEffect(() => {
    if (serviceTitle) {
      setMessage(`Olá Larissa! Conheci seu trabalho pelo site e gostaria de consultar horários para ${serviceTitle}.`);
    } else {
      setMessage(PROFILE_INFO.defaultWhatsAppMessage);
    }
  }, [serviceTitle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveNumber = () => {
    const cleaned = tempNumber.replace(/\D/g, '');
    setPhoneNumber(cleaned);
    localStorage.setItem('larissa_whatsapp_number', cleaned);
    setIsEditingNumber(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    const targetPhone = phoneNumber ? (phoneNumber.startsWith('55') ? phoneNumber : `55${phoneNumber}`) : '';
    const encoded = encodeURIComponent(message);
    
    if (targetPhone) {
      window.open(`https://wa.me/${targetPhone}?text=${encoded}`, '_blank', 'noopener,noreferrer');
    } else {
      // In case no number has been set yet, show prompt or direct config
      setIsEditingNumber(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-rose-100 bg-rose-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-900">Agendar via WhatsApp</h3>
              <p className="text-xs text-neutral-500">Larissa Rosa Beauty</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-white transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Status notice */}
          {!phoneNumber && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
              <div className="font-semibold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Número de WhatsApp em fase de confirmação</span>
              </div>
              <p className="text-amber-800">
                O número oficial de WhatsApp da Larissa ainda não foi informado. Você pode digitar e testar o número abaixo para redirecionamento imediato ou copiar a mensagem para envio direto.
              </p>
            </div>
          )}

          {/* Message preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Mensagem Sugerida
              </label>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs font-medium text-rose-700 hover:text-rose-900 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiada!' : 'Copiar mensagem'}</span>
              </button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full text-sm p-3.5 rounded-2xl border border-neutral-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none text-neutral-800 bg-neutral-50/50 resize-none transition-all"
            />
          </div>

          {/* Quick Number configuration for testing or permanent use */}
          <div className="pt-2 border-t border-rose-100/80">
            {isEditingNumber ? (
              <div className="space-y-2">
                <label className="text-xs font-medium text-neutral-700">
                  Definir número WhatsApp (DDD + Número):
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    placeholder="Ex: 31999998888"
                    value={tempNumber}
                    onChange={(e) => setTempNumber(e.target.value)}
                    className="flex-1 text-sm px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-none"
                  />
                  <button
                    onClick={handleSaveNumber}
                    className="px-4 py-2 text-xs font-semibold text-white bg-rose-700 rounded-xl hover:bg-rose-800 transition-colors"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setIsEditingNumber(false)}
                    className="px-3 py-2 text-xs text-neutral-500 hover:text-neutral-800"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs text-neutral-600">
                <span>
                  Número configurado: <strong className="text-neutral-800 font-semibold">{phoneNumber || 'Não informado'}</strong>
                </span>
                <button
                  onClick={() => {
                    setTempNumber(phoneNumber);
                    setIsEditingNumber(true);
                  }}
                  className="inline-flex items-center gap-1 text-rose-700 hover:underline font-medium"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{phoneNumber ? 'Alterar número' : 'Inserir número'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleOpenWhatsApp}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 rounded-full active:scale-98 transition-all shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{phoneNumber ? 'Abrir no WhatsApp' : 'Configurar Número & Enviar'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3.5 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
