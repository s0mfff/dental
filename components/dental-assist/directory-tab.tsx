'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, SearchX, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase, DentalTool } from '@/lib/supabase';
import { ToolCard } from '@/components/dental-assist/tool-card';
import { ToolModal } from '@/components/dental-assist/tool-modal';

export function DirectoryTab() {
  const [tools, setTools] = useState<DentalTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<DentalTool | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTools() {
      setLoading(true);
      setError(false);
      const { data, error: fetchError } = await supabase
        .from('dental_tools')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!isMounted) return;

      if (fetchError || !data) {
        setError(true);
        setTools([]);
      } else {
        setTools(data);
      }
      setLoading(false);
    }

    loadTools();
    return () => {
      isMounted = false;
    };
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    tools.forEach((tool) => tool.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [tools]);

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const matchesTag = !activeTag || tool.tags.includes(activeTag);
      if (!matchesTag) return false;
      if (!normalizedQuery) return true;
      const haystack = `${tool.name} ${tool.category} ${tool.description} ${tool.tags.join(' ')}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [tools, query, activeTag]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Найти инструмент, материал или место хранения..."
            className="w-full rounded-2xl border border-gray-100 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-800 shadow-sm outline-none transition-shadow placeholder:text-gray-400 focus:ring-2 focus:ring-gold-300"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <TagButton label="Все" isActive={activeTag === null} onClick={() => setActiveTag(null)} />
        {allTags.map((tag) => (
          <TagButton
            key={tag}
            label={tag}
            isActive={activeTag === tag}
            onClick={() => setActiveTag(tag)}
          />
        ))}
      </div>

      <div className="mt-8">
        {loading && (
          <div className="flex flex-col items-center gap-3 py-24 text-gray-400">
            <Loader2 className="h-6 w-6 animate-spin text-gold-400" />
            <p className="text-sm">Загружаем справочник...</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-sm">
            <AlertTriangle className="h-6 w-6 text-gold-500" />
            <p className="text-sm font-medium text-gray-700">Не удалось загрузить справочник</p>
            <p className="text-sm text-gray-400">Проверьте подключение и попробуйте обновить страницу</p>
          </div>
        )}

        {!loading && !error && filteredTools.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-sm">
            <SearchX className="h-6 w-6 text-gray-300" />
            <p className="text-sm font-medium text-gray-700">Ничего не найдено</p>
            <p className="text-sm text-gray-400">Попробуйте изменить запрос или сбросить фильтр</p>
          </div>
        )}

        {!loading && !error && filteredTools.length > 0 && (
          <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} onSelect={setSelectedTool} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  );
}

function TagButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
    >
      {isActive && (
        <motion.span
          layoutId="active-tag-pill"
          className="absolute inset-0 rounded-full bg-gold-400 shadow-sm"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}
      <span className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-500'}`}>
        {label}
      </span>
      {!isActive && (
        <span className="absolute inset-0 rounded-full border border-gray-100 bg-white" />
      )}
    </button>
  );
}
