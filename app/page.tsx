import Link from "next/link";
import DragDropImage from "./components/DragDropImage";
import EditableText from "./components/cms/EditableText";
import siteData from "./data/site.json";

export default function Home() {
  const { site, pages } = siteData;

  return (
    <div className="flex flex-col gap-16">
      <section className="animate-slide-in flex flex-col gap-6 rounded-3xl border border-[var(--green-muted)] bg-[var(--green-surface)] px-8 py-12 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <EditableText
              path="site.tagline"
              defaultValue={site.tagline}
              as="p"
              className="text-sm uppercase tracking-[0.2em] text-[var(--green-accent)]"
              singleLine
            />
            <EditableText
              path="pages.home.hero.headline"
              defaultValue={pages.home.hero.headline}
              as="h1"
              className="font-display text-4xl font-semibold leading-tight sm:text-5xl"
              singleLine
            />
            <EditableText
              path="pages.home.hero.subheadline"
              defaultValue={pages.home.hero.subheadline}
              as="p"
              className="max-w-2xl text-lg text-[color:rgba(31,45,31,0.75)]"
            />
          </div>
          <div className="w-full md:w-[260px]">
            <DragDropImage
              label="Upload your headshot"
              helper="Drop a portrait image here"
              className="h-full"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link
            className="rounded-full bg-[var(--green-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            href={pages.home.hero.cta.href}
          >
            <EditableText
              path="pages.home.hero.cta.label"
              defaultValue={pages.home.hero.cta.label}
              as="span"
              singleLine
            />
          </Link>
        </div>
      </section>

      {/* <section className="animate-slide-in animate-delay-1 grid gap-6 md:grid-cols-3">
        {pages.home.highlights.map((highlight, index) => (
          <div
            key={highlight.title}
            className="rounded-2xl border border-[var(--green-muted)] bg-[var(--green-surface)] p-6 shadow-sm"
          >
            <EditableText
              path={`pages.home.highlights.${index}.title`}
              defaultValue={highlight.title}
              as="h2"
              className="font-display text-xl font-semibold"
              singleLine
            />
            <EditableText
              path={`pages.home.highlights.${index}.description`}
              defaultValue={highlight.description}
              as="p"
              className="mt-3 text-sm text-[color:rgba(31,45,31,0.75)]"
            />
          </div>
        ))}
      </section> */}

<section className="animate-slide-in animate-delay-2 rounded-3xl border border-[var(--green-muted)] bg-[var(--green-surface)] px-8 py-10">
  <EditableText
    path="pages.home.sectionTitle"
    defaultValue="Technologies that I've worked with"
    as="h2"
    className="font-display text-2xl font-semibold"
    singleLine
  />
  <EditableText
    path="site.focus"
    defaultValue={site.focus}
    as="p"
    className="mt-3 max-w-3xl text-sm text-[color:rgba(31,45,31,0.75)]"
  />
  
  {/* Languages */}
  <div className="mt-8">
    <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[color:rgba(31,45,31,0.6)]">
      Languages
    </h3>
    <div className="flex flex-wrap gap-2.5">
      {['Java', 'Python', 'JavaScript', 'HTML/CSS', 'C', 'SQL'].map((lang) => (
        <span
          key={lang}
          className="group relative rounded-full bg-[var(--green-muted)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--green-accent)] transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-[var(--green-accent)]/20"
        >
          {lang}
        </span>
      ))}
    </div>
  </div>

  {/* Divider */}
  <div className="my-8 h-px bg-gradient-to-r from-transparent via-[var(--green-muted)] to-transparent" />

  {/* Frameworks/Libraries */}
  <div>
    <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[color:rgba(31,45,31,0.6)]">
      Frameworks & Libraries
    </h3>
    <div className="flex flex-wrap gap-2.5">
      {['Flask', 'FastAPI', 'PyTorch', 'Next.js', 'React.js', 'Express.js', 'Tailwind', 'PostgreSQL', 'SQLite3'].map((tech) => (
        <span
          key={tech}
          className="group relative rounded-full bg-[var(--green-muted)] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--green-accent)] transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-[var(--green-accent)]/20"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
</section>    </div>
  );
}
