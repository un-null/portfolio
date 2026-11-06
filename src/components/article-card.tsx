import type { ReactNode } from "react";

export function ArticleCard({ children }: { children: ReactNode }) {
  return (
    <div className="aspect-square w-full max-w-md rounded-2xl bg-zinc-900 p-6 transition-colors hover:bg-zinc-700">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950 p-4 shadow-md">
        {children}
      </div>
    </div>
  );
}
