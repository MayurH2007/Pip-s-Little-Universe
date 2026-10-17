import type { ReactNode } from "react";

export type ProjectTheme = "lullaby" | "nightlight" | "routes";

export interface ProjectMeta {
  id: string;
  theme: ProjectTheme;
  number: string;
  title: string;
  concept: string;
  hint: string;
}

interface ProjectCardProps {
  project: ProjectMeta;
  children: ReactNode;
}

/** Shell for one showcase project. Each theme gets its own visual treatment in CSS. */
export function ProjectCard({ project, children }: ProjectCardProps) {
  return (
    <article className={`project project--${project.theme} reveal`} id={project.id} aria-labelledby={`${project.id}-title`}>
      <header className="project__head">
        <p className="project__num">Project {project.number}</p>
        <h3 id={`${project.id}-title`} className="project__title">
          {project.title}
        </h3>
        <p className="project__concept">{project.concept}</p>
        <p className="project__hint">{project.hint}</p>
      </header>
      <div className="project__body">{children}</div>
    </article>
  );
}
