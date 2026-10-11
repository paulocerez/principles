import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import {
  designProjects,
  experience,
  findDesignProject,
  projectImages,
  type DesignProject,
  type ProjectImage,
} from "@/data/projects";

const num = (i: number) => String(i + 1).padStart(2, "0");

const frame = {
  borderRadius: 10,
  border: "1px solid var(--hairline)",
  background: "var(--panel)",
};

function Media({ media, alt, eager, className, style }: {
  media: ProjectImage;
  alt: string;
  eager: boolean;
  className: string;
  style?: CSSProperties;
}) {
  if (media.video) {
    return (
      <video
        src={media.src}
        aria-label={alt}
        autoPlay
        muted
        loop
        playsInline
        preload={eager ? "auto" : "metadata"}
        className={className}
        style={style}
      />
    );
  }
  return <img src={media.src} alt={alt} loading={eager ? "eager" : "lazy"} className={className} style={style} />;
}

// Marks history entries pushed by opening a card, so closing can go back instead of pushing.
const OPENED = { projectDialog: true };

function ProjectCard({ project, index }: { project: DesignProject; index: number }) {
  const cover = projectImages(project.slug)[0];

  return (
    <Link to={`?project=${project.slug}`} state={OPENED} className="group flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden" style={frame}>
        {cover ? (
          <Media
            media={cover}
            alt={project.title}
            eager={index < 2}
            className="h-full w-full object-cover object-left-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-mono text-[12px]" style={{ color: "var(--faint)" }}>
            {project.title}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="w-[22px] shrink-0 font-mono text-[12px] tabular-nums" style={{ color: "var(--accent)" }}>
          {num(index)}
        </span>
        <span className="min-w-0 flex-1 truncate text-[17px]" style={{ color: "var(--ink)" }}>
          {project.title}
        </span>
        <span className="shrink-0 font-mono text-[12px] tabular-nums" style={{ color: "var(--faint)" }}>
          {project.year}
        </span>
      </div>
      <p className="mt-1 pl-[34px] text-[14.5px] leading-[1.6]" style={{ color: "var(--muted)" }}>
        {project.tagline}
      </p>
    </Link>
  );
}

export function Projects() {
  const [params] = useSearchParams();
  const open = findDesignProject(params.get("project") ?? "");

  useEffect(() => {
    document.title = `${open ? `${open.slug}.md` : "projects.md"} - Paulo Ramirez`;
  }, [open]);

  return (
    <article>
      <h1 className="text-[34px] leading-[1.1]" style={{ fontWeight: 400, letterSpacing: "-0.03em" }}>
        Projects
      </h1>
      <p className="mt-4 max-w-[62ch] text-[15.5px] leading-[1.7]" style={{ color: "var(--muted)" }}>
        Selected design work. What I care about most is making complex products feel seamless and intuitive, so users
        understand a screen at a glance and can get their work done without thinking about the interface.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
        {designProjects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      <section className="mt-20 pt-10" style={{ borderTop: "1px solid var(--hairline)" }}>
        <p className="font-mono text-[12px]" style={{ color: "var(--faint)" }}>
          {"// experience"}
        </p>
        <div className="mt-6 flex flex-col gap-7">
          {experience.map((e) => (
            <a
              key={e.url}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4"
            >
              <img
                src={e.logo}
                alt={e.name}
                width={32}
                height={32}
                className="block shrink-0"
                style={{ width: 32, height: 32, borderRadius: 7 }}
              />
              <div className="min-w-0">
                <div className="flex h-8 items-center gap-1.5">
                  <span className="text-[17px]" style={{ color: "var(--ink)" }}>
                    {e.name}
                  </span>
                  <ArrowUpRight
                    size={15}
                    style={{ color: "var(--faint)" }}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <p className="max-w-[62ch] text-[14.5px] leading-[1.6]" style={{ color: "var(--prose)" }}>
                  {e.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <ProjectDialog project={open} />
    </article>
  );
}

function ProjectDialog({ project }: { project: DesignProject | undefined }) {
  const ref = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const openedFromGrid = Boolean((location.state as typeof OPENED | null)?.projectDialog);

  const close = () => {
    if (openedFromGrid) navigate(-1);
    else navigate(location.pathname, { replace: true });
  };

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
    document.documentElement.style.overflow = project ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [project?.slug]);

  return (
    <dialog
      ref={ref}
      aria-label={project?.title}
      className="project-dialog"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      {project && <ProjectBody project={project} onClose={close} />}
    </dialog>
  );
}

function Meta({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "var(--faint)" }}>
        {label}
      </dt>
      <dd className="mt-1.5 text-[15px] leading-[1.5]" style={{ color: "var(--ink)" }}>
        {children}
      </dd>
    </div>
  );
}

function ProjectBody({ project, onClose }: { project: DesignProject; onClose: () => void }) {
  // Keep the original entry's state when stepping, so closing still knows whether to go back.
  const { state } = useLocation();
  const images = projectImages(project.slug);
  const index = designProjects.indexOf(project);
  const prev = designProjects[index - 1];
  const next = designProjects[index + 1];

  return (
    <div tabIndex={-1} autoFocus className="px-6 pb-12 outline-none sm:px-12">
      <div
        className="sticky top-0 z-10 -mx-6 flex items-center justify-between px-6 py-4 sm:-mx-12 sm:px-12"
        style={{ background: "var(--bg)" }}
      >
        <span className="font-mono text-[12px] tabular-nums" style={{ color: "var(--faint)" }}>
          <span style={{ color: "var(--accent)" }}>{num(index)}</span> / {num(designProjects.length - 1)}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project"
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
          style={{ background: "var(--kbd-bg)", color: "var(--muted)" }}
        >
          <X size={16} />
        </button>
      </div>

      <h1 className="mt-4 text-[34px] leading-[1.1]" style={{ fontWeight: 400, letterSpacing: "-0.03em" }}>
        {project.title}
      </h1>
      <p className="mt-3 text-[17px] leading-[1.5]" style={{ color: "var(--muted)" }}>
        {project.tagline}
      </p>

      <dl
        className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 py-6 sm:grid-cols-4"
        style={{ borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}
      >
        <Meta label="Year">{project.year}</Meta>
        <Meta label="Role">{project.roles.join(", ")}</Meta>
        <Meta label="Tools">{project.tools.join(", ")}</Meta>
        {project.url && (
          <Meta label="Link">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 underline underline-offset-4"
              style={{ textDecorationColor: "var(--hairline)" }}
            >
              {new URL(project.url).hostname.replace(/^www\./, "")}
              <ArrowUpRight size={14} style={{ color: "var(--faint)" }} />
            </a>
          </Meta>
        )}
      </dl>

      <div className="mt-10 flex max-w-[62ch] flex-col gap-5">
        {project.body.map((paragraph, i) => (
          <p key={i} className="text-[15.5px] leading-[1.7]" style={{ color: "var(--prose)" }}>
            {paragraph}
          </p>
        ))}
      </div>

      {images.length === 0 ? (
        <p className="mt-10 font-mono text-[13px]" style={{ color: "var(--faint)" }}>
          {`// no images yet — add them to src/assets/projects/${project.slug}/`}
        </p>
      ) : (
        <div className="mt-12 flex flex-col gap-12">
          {images.map((img, i) => {
            const caption = project.captions?.[img.name];
            return (
              <figure key={img.src}>
                <Media
                  media={img}
                  alt={caption ?? `${project.title} ${num(i)}`}
                  eager={i === 0}
                  className="block h-auto w-full"
                  style={frame}
                />
                <figcaption className="mt-3 flex gap-3 font-mono text-[12px]" style={{ color: "var(--faint)" }}>
                  <span className="tabular-nums" style={{ color: "var(--accent)" }}>
                    fig. {num(i)}
                  </span>
                  {caption && <span>{caption}</span>}
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}

      {(prev || next) && (
        <nav className="mt-20 grid grid-cols-2 gap-8 pt-6" style={{ borderTop: "1px solid var(--hairline)" }}>
          <div>
            {prev && (
              <Link to={`?project=${prev.slug}`} state={state} replace className="flex flex-col gap-1">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "var(--faint)" }}>
                  <ArrowLeft size={12} /> previous
                </span>
                <span className="text-[17px]" style={{ color: "var(--ink)" }}>{prev.title}</span>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link to={`?project=${next.slug}`} state={state} replace className="flex flex-col items-end gap-1">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "var(--faint)" }}>
                  next <ArrowRight size={12} />
                </span>
                <span className="text-[17px]" style={{ color: "var(--ink)" }}>{next.title}</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
