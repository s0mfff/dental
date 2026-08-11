import { LucideIcon, Stethoscope, Syringe, Wrench, Layers, Activity, Copy, ShieldCheck, Sun, Flame, Package } from 'lucide-react';

export type TabId = 'directory' | 'cabinet' | 'protocols';

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  'Диагностика': Stethoscope,
  'Анестезия': Syringe,
  'Препарирование': Wrench,
  'Пломбирование': Layers,
  'Эндодонтия': Activity,
  'Слепки': Copy,
  'Изоляция': ShieldCheck,
  'Полимеризация': Sun,
  'Стерилизация': Flame,
  'Расходники': Package,
};

export const DEFAULT_CATEGORY_ICON: LucideIcon = Package;
