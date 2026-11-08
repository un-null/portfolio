import Link from "next/link";

import { Card } from "@/components/card";
import { getPublishedProject } from "@/utils/notion";

export default async function Roadmap() {
  const { result } = await getPublishedProject();

  return (
    <div className="space-y-10 overflow-x-hidden">
      <section>
        <Card className="grid gap-4 rounded-sm border p-6 text-[#EEEEEE] ring-[#EDEDED]">
          <h1 className="text-xl font-bold text-[#EEEEEE]">About</h1>
          <p className="text-sm font-thin leading-6">
            Here is my 2025 roadmap. You can review my tasks in review, in
            progress and completed.
            <br />
            It made based on 曼荼羅 (Mandala) chart inspired by 密教 (Esoteric
            Buddhism)
          </p>
          <Link
            href={
              "https://trail-smell-0f7.notion.site/1832ae27629380b7b7ebed00752f0a8b?pvs=4"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 cursor-pointer text-sm text-[#FFFFFFAF] hover:text-[#EEEEEE]"
          >
            {"> See 曼荼羅 chart"}
          </Link>
        </Card>
      </section>

      <section className="mb-8 space-y-4 text-[#EEEEEE]">
        <h1 className="text-xl font-bold">Roadmap</h1>
        <div className="-mx-4 overflow-x-auto px-4 pb-2">
          <div className="flex gap-4">
            {/* In Review Column */}
            <div className="flex min-w-[200px] flex-col">
              <h2 className="mb-4">In Review</h2>
              <div className="flex flex-col gap-4">
                {result.in_review.map((item) => (
                  <Card
                    key={item?.id}
                    className="space-y-3 rounded bg-[#F1F1EF]/30 p-4"
                  >
                    <p className="text-xs"># {item?.label.name}</p>
                    <p className="text-sm font-bold">{item?.title}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="flex min-w-[200px] flex-col">
              <h2 className="mb-4">In progress</h2>
              <div className="flex flex-col gap-4">
                {result.in_progress.map((item) => (
                  <Card
                    key={item?.id}
                    className="space-y-3 rounded bg-[#529CCA]/40 p-4"
                  >
                    <p className="text-xs"># {item?.label.name}</p>
                    <p className="text-sm font-bold">{item?.title}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Completed Column */}
            <div className="flex min-w-[200px] flex-col">
              <h2 className="mb-4">Completed</h2>
              <div className="flex flex-col gap-4">
                {result.completed.map((item) => (
                  <Card
                    key={item?.id}
                    className="space-y-3 rounded bg-[#4DAB9A]/40 p-4"
                  >
                    <p className="text-xs"># {item?.label.name}</p>
                    <p className="text-sm font-bold">{item?.title}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
