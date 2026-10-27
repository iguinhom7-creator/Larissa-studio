/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem, ServiceItem } from '../types.ts';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'lash-volume',
    title: 'Extensão de Cílios - Volume & Harmonia',
    category: 'cilios',
    categoryLabel: 'Lash Design',
    image: '/src/assets/images/work_lash_extensions_1793109140406.jpg',
    description: 'Isolamento preciso e aplicação fio a fio adaptada ao formato natural dos olhos.',
  },
  {
    id: 'eyebrow-sculpting',
    title: 'Design & Micropigmentação de Sobrancelhas',
    category: 'sobrancelhas',
    categoryLabel: 'Sobrancelhas',
    image: '/src/assets/images/work_eyebrow_design_1793109141519.jpg',
    description: 'Mapeamento anatômico para harmonização facial com traços naturais e delicados.',
  },
  {
    id: 'nail-gel-art',
    title: 'Nail Design & Esmaltação em Gel',
    category: 'unhas',
    categoryLabel: 'Unhas',
    image: '/src/assets/images/work_nail_art_1793109141501.jpg',
    description: 'Cuticulagem detalhada, acabamento fino e esmaltação duradoura em tons elegantes.',
  },
  {
    id: 'studio-atmosphere',
    title: 'Ambiente de Atendimento',
    category: 'estudio',
    categoryLabel: 'Espaço',
    image: '/src/assets/images/studio_atmosphere_1793109141475.jpg',
    description: 'Espaço confortável, higienizado e acolhedor planejado para seu atendimento exclusivo.',
  },
  {
    id: 'lash-natural',
    title: 'Lash Design - Fio a Fio Delicado',
    category: 'cilios',
    categoryLabel: 'Lash Design',
    image: '/src/assets/images/work_lash_extensions_1793109140406.jpg',
    description: 'Leveza e definição com materiais hipoalergênicos de alta qualidade.',
  },
  {
    id: 'brow-alignment',
    title: 'Alinhamento & Simetria de Sobrancelhas',
    category: 'sobrancelhas',
    categoryLabel: 'Sobrancelhas',
    image: '/src/assets/images/work_eyebrow_design_1793109141519.jpg',
    description: 'Correção de falhas e valorização do desenho natural do rosto.',
  },
];

export const SERVICES_ITEMS: ServiceItem[] = [
  {
    id: 'extensao-cilios',
    title: 'Extensão de Cílios (Lash Design)',
    tagline: 'Definição e volume sob medida',
    category: 'Cílios',
    description: 'Técnicas de extensão fio a fio e volume russo com mapeamento específico para cada cliente, respeitando a saúde dos fios biológicos.',
    highlights: ['Isolamento rigoroso', 'Fios ultrafinos e macios', 'Alta durabilidade'],
  },
  {
    id: 'design-sobrancelhas',
    title: 'Design & Micropigmentação',
    tagline: 'Harmonização do olhar',
    category: 'Sobrancelhas',
    description: 'Estruturação do arco das sobrancelhas através de medição personalizada e micropigmentação com aspecto natural e simétrico.',
    highlights: ['Mapeamento facial', 'Pigmentos certificados', 'Aspecto suave e natural'],
  },
  {
    id: 'nail-design',
    title: 'Nail Care & Esmaltação em Gel',
    tagline: 'Cuidado completo para unhas',
    category: 'Unhas',
    description: 'Tratamento das unhas naturais, esmaltação em gel de alta resistência e acabamento fino com durabilidade superior.',
    highlights: ['Esmaltes de alta durabilidade', 'Acabamento nivelado', 'Brilho espelhado'],
  },
];

export const PROFILE_INFO = {
  name: 'Larissa Rosa',
  brandName: 'Larissa Rosa Beauty',
  tagline: 'Lash Designer & Micropigmentação',
  instagramHandle: 'larissarosa_beauty',
  instagramUrl: 'https://www.instagram.com/larissarosa_beauty/',
  email: 'larissarosa1528@gmail.com',
  defaultWhatsAppMessage: 'Olá Larissa! Conheci seu trabalho pelo site e gostaria de consultar horários disponíveis para agendamento.',
  portraitImage: '/src/assets/images/larissa_rosa_portrait_1793109139380.jpg',
  presentationVideo: '/videos/larissa_rosa_apresentacao.mp4',
  videoPoster: '/videos/larissa_video_poster.jpg',
};
