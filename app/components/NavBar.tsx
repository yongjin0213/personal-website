import Link from "next/link";
import EditableText from "./cms/EditableText";

type NavBarProps = {
  siteName: string;
};

export default function NavBar({ siteName }: NavBarProps) {
  return (
    <header className="relative z-10 border-b border-[var(--green-muted)] bg-[rgba(245,251,242,0.8)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold">
          <EditableText
            path="site.name"
            defaultValue={siteName}
            as="span"
            singleLine
          />
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
          <Link className="hover:text-[var(--green-accent)]" href="/experiences">
            Experiences
          </Link>
          <Link className="hover:text-[var(--green-accent)]" href="/blogs">
            Blogs
          </Link>
          <Link className="hover:text-[var(--green-accent)]" href="/contact">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
