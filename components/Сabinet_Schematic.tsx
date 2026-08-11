import React from 'react';

interface CabinetProps {
  activeDrawerId?: string; // ID ящика, который подсвечивается красным
  onSelectDrawer?: (id: string) => void;
}

export function CabinetSchematic({ activeDrawerId, onSelectDrawer }: CabinetProps) {
  // Функция проверки: подсвечивать ящик красным или оставлять белым в стиле IKEA
  const getDrawerStyle = (id: string) =>
    activeDrawerId === id 
      ? 'bg-red-500 border-red-600 text-white animate-pulse shadow-md z-20' 
      : 'bg-white hover:bg-gray-50 border-gray-900 text-gray-800';

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
      <h3 className="text-center font-bold text-gray-900 text-base mb-6 tracking-wider uppercase">
        Схема гарнитура — Кабинет №3
      </h3>

      <div className="flex flex-col items-center w-full">
        {/* ================= ВЕРХНИЕ ШКАФЫ (3 слитные секции, сделаны выше: h-44) ================= */}
        <div className="grid grid-cols-3 w-full h-44 border-2 border-gray-900 rounded-sm">
          {[
            { id: 'top-1', label: 'Шкаф В1' },
            { id: 'top-2', label: 'Шкаф В2' },
            { id: 'top-3', label: 'Шкаф В3' },
          ].map((item, idx) => (
            <button
              key={item.id}
              onClick={() => onSelectDrawer?.(item.id)}
              className={`relative transition-all duration-150 flex flex-col justify-between items-center p-2 ${
                idx < 2 ? 'border-r-2 border-gray-900' : ''
              } ${getDrawerStyle(item.id)}`}
            >
              <span className="text-[10px] font-mono opacity-40 self-start">{item.label}</span>
              {/* Горизонтальная ручка внизу */}
              <div className="w-10 h-1.5 bg-gray-900 rounded-full mb-1" />
            </button>
          ))}
        </div>

        {/* ПРОСТРАНСТВО МЕЖДУ СЕКЦИЯМИ */}
        <div className="h-16 w-full" />

        {/* ================= СТОЛЕШНИЦА (с бортиком) ================= */}
        <div className="w-[102%] border-2 border-gray-900 bg-white rounded-t-sm flex flex-col">
          <div className="h-1.5 border-b border-gray-900 bg-gray-100" /> {/* Бортик */}
          <div className="h-2.5 bg-white" />
        </div>

        {/* ================= НИЖНИЕ ШКАФЫ И ЯЩИКИ ================= */}
        <div className="grid grid-cols-12 w-full h-72 border-2 border-t-0 border-gray-900">
          
          {/* 1. Левая крайняя дверца (Н1) */}
          <button
            onClick={() => onSelectDrawer?.('bottom-left-door')}
            className={`col-span-2 border-r-2 border-gray-900 relative transition-all duration-150 flex flex-col items-center pt-3 p-2 ${getDrawerStyle('bottom-left-door')}`}
          >
            <div className="w-8 h-1.5 bg-gray-900 rounded-full" />
            <span className="absolute bottom-2 left-2 text-[10px] font-mono opacity-40">Н1</span>
          </button>

          {/* 2. Левый блок ящиков: 1 мелкий + 2 глубоких */}
          <div className="col-span-3 border-r-2 border-gray-900 flex flex-col">
            <button
              onClick={() => onSelectDrawer?.('drawer-l1')}
              className={`h-[22%] border-b-2 border-gray-900 relative transition-all duration-150 flex items-center justify-center ${getDrawerStyle('drawer-l1')}`}
            >
              <div className="w-8 h-1.5 bg-gray-900 rounded-full" />
              <span className="absolute right-1 bottom-0.5 text-[8px] font-mono opacity-40">Я1.1</span>
            </button>

            <button
              onClick={() => onSelectDrawer?.('drawer-l2')}
              className={`h-[39%] border-b-2 border-gray-900 relative transition-all duration-150 flex items-start justify-center pt-2 ${getDrawerStyle('drawer-l2')}`}
            >
              <div className="w-8 h-1.5 bg-gray-900 rounded-full" />
              <span className="absolute right-1 bottom-0.5 text-[8px] font-mono opacity-40">Я1.2</span>
            </button>

            <button
              onClick={() => onSelectDrawer?.('drawer-l3')}
              className={`h-[39%] relative transition-all duration-150 flex items-start justify-center pt-2 ${getDrawerStyle('drawer-l3')}`}
            >
              <div className="w-8 h-1.5 bg-gray-900 rounded-full" />
              <span className="absolute right-1 bottom-0.5 text-[8px] font-mono opacity-40">Я1.3</span>
            </button>
          </div>

          {/* 3. Правый блок ящиков: 1 мелкий + 2 глубоких */}
          <div className="col-span-3 border-r-2 border-gray-900 flex flex-col">
            <button
              onClick={() => onSelectDrawer?.('drawer-r1')}
              className={`h-[22%] border-b-2 border-gray-900 relative transition-all duration-150 flex items-center justify-center ${getDrawerStyle('drawer-r1')}`}
            >
              <div className="w-8 h-1.5 bg-gray-900 rounded-full" />
              <span className="absolute right-1 bottom-0.5 text-[8px] font-mono opacity-40">Я2.1</span>
            </button>

            <button
              onClick={() => onSelectDrawer?.('drawer-r2')}
              className={`h-[39%] border-b-2 border-gray-900 relative transition-all duration-150 flex items-start justify-center pt-2 ${getDrawerStyle('drawer-r2')}`}
            >
              <div className="w-8 h-1.5 bg-gray-900 rounded-full" />
              <span className="absolute right-1 bottom-0.5 text-[8px] font-mono opacity-40">Я2.2</span>
            </button>

            <button
              onClick={() => onSelectDrawer?.('drawer-r3')}
              className={`h-[39%] relative transition-all duration-150 flex items-start justify-center pt-2 ${getDrawerStyle('drawer-r3')}`}
            >
              <div className="w-8 h-1.5 bg-gray-900 rounded-full" />
              <span className="absolute right-1 bottom-0.5 text-[8px] font-mono opacity-40">Я2.3</span>
            </button>
          </div>

          {/* 4. Правые 2 дверцы под раковину (Н2 и Н3) */}
          <div className="col-span-4 grid grid-cols-2">
            <button
              onClick={() => onSelectDrawer?.('bottom-sink-left')}
              className={`border-r-2 border-gray-900 relative transition-all duration-150 flex flex-col items-center pt-3 p-2 ${getDrawerStyle('bottom-sink-left')}`}
            >
              <div className="w-8 h-1.5 bg-gray-900 rounded-full" />
              <span className="absolute bottom-2 left-2 text-[10px] font-mono opacity-40">Н2</span>
            </button>

            <button
              onClick={() => onSelectDrawer?.('bottom-sink-right')}
              className={`relative transition-all duration-150 flex flex-col items-center pt-3 p-2 ${getDrawerStyle('bottom-sink-right')}`}
            >
              <div className="w-8 h-1.5 bg-gray-900 rounded-full" />
              <span className="absolute bottom-2 right-2 text-[10px] font-mono opacity-40">Н3</span>
            </button>
          </div>

        </div>

        {/* ================= НОЖКИ ================= */}
        <div className="w-full flex justify-between px-8 pt-0.5">
          <div className="w-2.5 h-3.5 bg-gray-900 rounded-b-sm" />
          <div className="w-2.5 h-3.5 bg-gray-900 rounded-b-sm" />
          <div className="w-2.5 h-3.5 bg-gray-900 rounded-b-sm" />
          <div className="w-2.5 h-3.5 bg-gray-900 rounded-b-sm" />
        </div>
      </div>
    </div>
  );
}