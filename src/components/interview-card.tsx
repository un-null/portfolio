import Image from "next/image";

const interview = {
  title:
    "\"If I go, I'll figure it out.\" From a high school graduate with a liberal arts background to overseas. Expanding engineer possibilities through GAOGAO's study abroad program",
  source: "GAOGAO (note.com)",
  url: "https://note.com/gaogaoasia/n/nd07266c12109",
  image: "/interview/gaogao-note.jpg",
};

export default function InterviewCard() {
  return (
    <a
      href={interview.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 flex items-center gap-4 rounded-lg border border-[#454B4E] p-4 transition-colors hover:bg-[#222222]"
    >
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[#6B7075]">{interview.source}</p>
        <p className="mt-1 text-sm leading-snug text-[#EEEEEE]">
          {interview.title}
        </p>
      </div>
      <Image
        src={interview.image}
        alt=""
        width={160}
        height={90}
        sizes="(max-width: 640px) 120px, 160px"
        className="h-[67px] w-[120px] shrink-0 rounded-md object-cover sm:h-[90px] sm:w-[160px]"
      />
    </a>
  );
}
