import Link from "next/link";

import Icon from "../icons/icon";

export default function Header() {
  return (
    <header className="mb-5 flex items-center md:mb-10">
      <Link
        href="/"
        className="mr-auto flex-1 text-lg font-bold text-[#EEEEEE]"
      >
        null
      </Link>
      <nav className="flex items-center justify-end gap-4 text-xs md:gap-3">
        <Link href="/blog" className="hover:text-[#EEEEEE]">
          Blog
        </Link>
        <Link href="/roadmap" className="hover:text-[#EEEEEE]">
          Roadmap
        </Link>
        <Link href="/contact" className="hover:text-[#EEEEEE]">
          Contact
        </Link>
        <a
          href="https://twitter.com/nu_____ll"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="hover:text-[#EEEEEE]"
        >
          <Icon type="X" size={16} />
        </a>
      </nav>
    </header>
  );
}
