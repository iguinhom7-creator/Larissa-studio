/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'cilios' | 'sobrancelhas' | 'unhas' | 'estudio';
  categoryLabel: string;
  image: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  highlights: string[];
}
