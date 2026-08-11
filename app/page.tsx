'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Briefcase, ClipboardList } from 'lucide-react';
import { Header } from '@/components/dental-assist/header';
import { DirectoryTab } from '@/components/dental-assist/directory-tab';
import { PlaceholderTab } from '@/components/dental-assist/placeholder-tab';
import { CabinetSchematic } from '@/components/Сabinet_Schematic';
import { TabId } from '@/lib/types';
export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('directory');

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8F9FA]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-gold-200/40 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-gold-100/50 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-gold-50 blur-3xl" />
      </div>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'directory' && <DirectoryTab />}
            {activeTab === 'cabinet' && <CabinetSchematic />}
            {activeTab === 'protocols' && (
              <PlaceholderTab
                icon={ClipboardList}
                title="Протоколы"
                description="Здесь появятся протоколы ассистирования по видам приёма. Раздел в разработке."
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
