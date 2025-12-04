interface Props {
  unit: string;
  active: boolean;
  onClick: () => void;
}

export default function UnitToggleItem({ unit, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 border ${active ? 'bg-sky-500 text-white' : 'text-slate-700'}`}
    >
      {unit}
    </button>
  );
}
