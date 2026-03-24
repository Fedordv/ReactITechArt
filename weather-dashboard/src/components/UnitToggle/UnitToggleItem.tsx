interface Props {
  unit: string;
  active: boolean;
  onClick: () => void;
  className?: string; 
}

export default function UnitToggleItem({ unit, active, onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 border transition-colors ${
        active ? 'bg-sky-500 text-white border-sky-500' : 'text-slate-700 bg-white dark:bg-slate-700'
      } ${className || ''}`}
    >
      {unit}
    </button>
  );
}
