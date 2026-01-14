import DragDropImage from "../components/DragDropImage";
import EditableText from "../components/cms/EditableText";
import siteData from "../data/site.json";

export default function ExperiencesPage() {
  const { pages } = siteData;

  return (
    <div className="flex flex-col gap-10">
      <section className="animate-slide-in rounded-3xl border border-[var(--green-muted)] bg-[var(--green-surface)] px-8 py-10 shadow-sm">
        <EditableText
          path="pages.experiences.title"
          defaultValue="Experiences & Projects"
          as="h1"
          className="font-display text-3xl font-semibold sm:text-4xl"
          singleLine
        />
        <EditableText
          path="pages.experiences.description"
          defaultValue="A sample of the systems, products, and experiments I am building."
          as="p"
          className="mt-4 max-w-3xl text-base text-[color:rgba(31,45,31,0.75)]"
        />
      </section>

      <section className="animate-slide-in animate-delay-1 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">
            Work experience
          </h2>
        </div>
        {pages.experiences.work.map((experience, index) => (
          <article
            key={experience.name}
            className="rounded-2xl border border-[var(--green-muted)] bg-[var(--green-surface)] p-6 shadow-sm"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <EditableText
                  path={`pages.experiences.work.${index}.name`}
                  defaultValue={experience.name}
                  as="h3"
                  className="font-display text-2xl font-semibold"
                  singleLine
                />
                <EditableText
                  path={`pages.experiences.work.${index}.role`}
                  defaultValue={experience.role}
                  as="p"
                  className="text-sm text-[color:rgba(31,45,31,0.7)]"
                  singleLine
                />
              </div>
              <EditableText
                path={`pages.experiences.work.${index}.period`}
                defaultValue={experience.period}
                as="span"
                className="text-sm font-semibold text-[var(--green-accent)]"
                singleLine
              />
            </div>
            <EditableText
              path={`pages.experiences.work.${index}.summary`}
              defaultValue={experience.summary}
              as="p"
              className="mt-3 text-sm text-[color:rgba(31,45,31,0.75)]"
            />
            <details className="mt-4 rounded-2xl border border-[var(--green-muted)] bg-[var(--green-bg)] px-4 py-3 text-sm">
              <summary className="cursor-pointer font-semibold text-[var(--green-accent)]">
                Read more
              </summary>
              <EditableText
                path={`pages.experiences.work.${index}.details`}
                defaultValue={experience.details}
                as="p"
                className="mt-3 text-[color:rgba(31,45,31,0.75)]"
              />
            </details>
            <div className="mt-4">
              <DragDropImage
                label="Add a work photo"
                helper="Drag a snapshot of this role"
                compact
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--green-accent)]">
              {experience.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[var(--green-muted)] px-3 py-2"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="animate-slide-in animate-delay-2 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">
            Project experience
          </h2>
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--green-accent)]">
            Builds
          </span>
        </div>
        {pages.experiences.projects.map((project, index) => (
          <article
            key={project.name}
            className="rounded-2xl border border-[var(--green-muted)] bg-[var(--green-surface)] p-6 shadow-sm"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <EditableText
                  path={`pages.experiences.projects.${index}.name`}
                  defaultValue={project.name}
                  as="h3"
                  className="font-display text-2xl font-semibold"
                  singleLine
                />
                <EditableText
                  path={`pages.experiences.projects.${index}.role`}
                  defaultValue={project.role}
                  as="p"
                  className="text-sm text-[color:rgba(31,45,31,0.7)]"
                  singleLine
                />
              </div>
            </div>
            <EditableText
              path={`pages.experiences.projects.${index}.summary`}
              defaultValue={project.summary}
              as="p"
              className="mt-3 text-sm text-[color:rgba(31,45,31,0.75)]"
            />
            <details className="mt-4 rounded-2xl border border-[var(--green-muted)] bg-[var(--green-bg)] px-4 py-3 text-sm">
              <summary className="cursor-pointer font-semibold text-[var(--green-accent)]">
                Read more
              </summary>
              <EditableText
                path={`pages.experiences.projects.${index}.details`}
                defaultValue={project.details}
                as="p"
                className="mt-3 text-[color:rgba(31,45,31,0.75)]"
              />
            </details>
            <div className="mt-4">
              <DragDropImage
                label="Add a project photo"
                helper="Drop a screenshot or mockup"
                compact
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--green-accent)]">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[var(--green-muted)] px-3 py-2"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
