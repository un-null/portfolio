"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/blog",
    label: "blog",
  },
  {
    href: "/blog/zenn",
    label: "zenn",
  },
];

export const Tab = () => {
  const pathname = usePathname();

  return (
    <div className="mb-4 flex gap-4">
      {navItems.map((item) => {
        const isActive =
          item.href === "/blog"
            ? pathname === "/blog" ||
              (pathname.startsWith("/blog/") &&
                !pathname.startsWith("/blog/zenn"))
            : pathname === item.href;

        return (
          <Link
            href={item.href}
            key={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`pb-1 ${
              isActive ? "border-b border-[#EEEEEE] text-[#EEEEEE]" : ""
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};
