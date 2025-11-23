import { useForm } from 'react-hook-form';

type SearchForm = {
  city: string;
};

interface Props {
  onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const { register, handleSubmit, reset } = useForm<SearchForm>();

  const onSubmit = (data: SearchForm) => {
    onSearch(data.city);
     reset(); 
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-4 flex gap-2"
    >
      <input
        {...register('city', { required: true })}
        className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-800"
        placeholder="Enter city name..."
      />
      <button
        type="submit"
        className="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-sky-600"
      >
        Search
      </button>
    </form>
  );
}
