type NewsProps = {
  created: string;
  tittle: string;
  content: string;
};

export default function NewsCard({ created, tittle, content }: NewsProps) {
  const formattedDate = new Date(created).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-3/5 mx-auto flex flex-col gap-4 bg-gray-800 text-gray-200 p-4 rounded-xl">
      <div className="text-xl font-semibold">{tittle}</div>
      <div>{content}</div>
      <div className="text-sm text-gray-400">{formattedDate}</div>
    </div>
  );
} 