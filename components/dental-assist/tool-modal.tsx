'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import { DentalTool } from '@/lib/supabase';
import { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from '@/lib/types';

export function ToolModal({
  tool,
  onClose,
}: {
  tool: DentalTool | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!tool) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tool, onClose]);

  const Icon = tool ? CATEGORY_ICONS[tool.category] ?? DEFAULT_CATEGORY_ICON : DEFAULT_CATEGORY_ICON;

  return (
    <AnimatePresence>
      {tool && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-50">
                <Icon className="h-5 w-5 text-gold-500" />
              </div>
              <span className="inline-flex items-center rounded-full bg-gold-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
                {tool.category}
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-semibold leading-snug text-gray-900">{tool.name}</h2>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-gold-100 bg-gold-50 p-4">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  Место хранения
                </p>
                <p className="mt-1 text-sm font-medium text-gray-800">{tool.storage_location}</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-gray-600">{tool.description}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1 text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
