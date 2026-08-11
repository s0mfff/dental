'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { DentalTool } from '@/lib/supabase';
import { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from '@/lib/types';

export function ToolCard({
  tool,
  onSelect,
}: {
  tool: DentalTool;
  onSelect: (tool: DentalTool) => void;
}) {
  const Icon = CATEGORY_ICONS[tool.category] ?? DEFAULT_CATEGORY_ICON;

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={() => onSelect(tool)}
      className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-gold-600">
          {tool.category}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50">
          <Icon className="h-4 w-4 text-gold-500" />
        </div>
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug text-gray-900">{tool.name}</h3>

      <div className="mt-2 flex items-start gap-1.5 text-sm text-gray-500">
        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" />
        <span className="leading-snug">{tool.storage_location}</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1 text-xs text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.button>
  );
}
