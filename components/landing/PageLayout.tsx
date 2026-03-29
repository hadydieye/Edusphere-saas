'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, subtitle, badge, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#06090F] flex flex-col text-[#F0F4FF] selection:bg-[#CE1126]/30">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Header de page */}
          <div className="text-center md:text-left mb-12">
            {badge && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 cursor-default border border-[#1A2540] bg-[#0D1320]"
                   style={{
                     background: 'linear-gradient(135deg, rgba(206,17,38,0.08), rgba(252,209,22,0.05), rgba(0,148,96,0.08))',
                   }}>
                <span className="text-xs font-bold tracking-widest text-[#FCD116] font-[var(--font-dm-sans)] uppercase">
                  {badge}
                </span>
              </div>
            )}
            
            <h1 className="font-[var(--font-syne)] text-[3rem] md:text-[4rem] font-extrabold leading-[1.1] text-[#F0F4FF] mb-6">
              {title.split(' ').map((word, i, arr) => {
                // Application d'un gradient rouge->or très simpliste sur le dernier mot clé si on veut, 
                // mais la consigne dit "sur le mot clé". On l'applique sur le dernier mot pour l'exemple
                if (i === arr.length - 1 && arr.length > 1) {
                  return (
                    <span key={i} className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #CE1126, #FCD116)' }}>
                       {word}
                    </span>
                  );
                }
                return word + ' ';
              })}
            </h1>

            {subtitle && (
              <p className="font-[var(--font-dm-sans)] text-lg md:text-xl text-[#6B7A99] max-w-2xl leading-relaxed mx-auto md:mx-0">
                {subtitle}
              </p>
            )}

            <div className="w-full h-[1px] bg-[#1A2540] mt-8" />
          </div>

          {/* Contenu de la page */}
          <div className="mt-8">
            {children}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
