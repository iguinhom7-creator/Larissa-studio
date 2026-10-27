/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { PortfolioCarousel } from './components/PortfolioCarousel.tsx';
import { Services } from './components/Services.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { WhatsAppModal } from './components/WhatsAppModal.tsx';
import { LightboxModal } from './components/LightboxModal.tsx';
import { PORTFOLIO_ITEMS } from './data/portfolioData.ts';
import { PortfolioItem } from './types.ts';

export default function App() {
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [selectedServiceForWhatsApp, setSelectedServiceForWhatsApp] = useState<string | undefined>(undefined);
  const [activeLightboxItem, setActiveLightboxItem] = useState<PortfolioItem | null>(null);

  const handleOpenWhatsApp = (serviceTitle?: string) => {
    setSelectedServiceForWhatsApp(serviceTitle);
    setIsWhatsAppModalOpen(true);
  };

  const handleCloseWhatsApp = () => {
    setIsWhatsAppModalOpen(false);
    setSelectedServiceForWhatsApp(undefined);
  };

  // Lightbox carousel navigation
  const handleNextLightbox = () => {
    if (!activeLightboxItem) return;
    const currentIndex = PORTFOLIO_ITEMS.findIndex((item) => item.id === activeLightboxItem.id);
    const nextIndex = (currentIndex + 1) % PORTFOLIO_ITEMS.length;
    setActiveLightboxItem(PORTFOLIO_ITEMS[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!activeLightboxItem) return;
    const currentIndex = PORTFOLIO_ITEMS.findIndex((item) => item.id === activeLightboxItem.id);
    const prevIndex = (currentIndex - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length;
    setActiveLightboxItem(PORTFOLIO_ITEMS[prevIndex]);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contato');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenWhatsApp();
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-rose-100 selection:text-rose-900 flex flex-col font-sans">
      {/* 3-Zone Top Navigation */}
      <Navbar onOpenContact={scrollToContact} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Topo / Hero with Profile & 3D Jewel */}
        <Hero onOpenWhatsApp={() => handleOpenWhatsApp()} />

        {/* 2. Sobre / Apresentação Objetiva */}
        <About />

        {/* 3. Meu Trabalho (Portfólio Visual em Carrossel) */}
        <PortfolioCarousel onSelectItem={(item) => setActiveLightboxItem(item)} />

        {/* 4. Serviços Confirmados */}
        <Services onSelectService={(serviceTitle) => handleOpenWhatsApp(serviceTitle)} />

        {/* 5. Contato & Botões Oficiais */}
        <ContactSection onOpenWhatsApp={() => handleOpenWhatsApp()} />
      </main>

      {/* Footer */}
      <Footer onOpenWhatsApp={() => handleOpenWhatsApp()} />

      {/* Functional WhatsApp Modal */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={handleCloseWhatsApp}
        serviceTitle={selectedServiceForWhatsApp}
      />

      {/* Fullscreen Photo Lightbox Modal */}
      <LightboxModal
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
        onNext={handleNextLightbox}
        onPrev={handlePrevLightbox}
      />
    </div>
  );
}
