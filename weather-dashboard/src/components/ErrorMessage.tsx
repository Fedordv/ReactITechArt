type Props = { message: string };

export default function ErrorMessage({ message }: Props) {
  return (
    <p className="text-red-500 text-center font-semibold py-4">
      ❗ {message}
    </p>
  );
}
