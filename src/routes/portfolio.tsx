import { lazy, Suspense, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import {
  designPrinciples,
  experience,
  findDesignProject,
  projectImages,
  visibleProjects,
  type CaseSection,
  type DesignProject,
  type ProjectImage,
} from "@/data/projects";

const Places = lazy(() => import("@/components/places"));
const PlacesCover = lazy(() => import("@/components/places").then((m) => ({ default: m.PlacesCover })));

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
        {project.interactive === "places" ? (
          <Suspense fallback={null}>
            <PlacesCover />
          </Suspense>
        ) : cover ? (
          <Media
            media={cover}
            alt={project.title}
            eager={index < 2}
            className="h-full w-full object-cover object-left-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : project.cover ? (
          // No screenshots: a typographic cover with the logo and the key number.
          <div
            className="flex h-full w-full flex-col justify-between p-7 text-white transition-transform duration-500 ease-out group-hover:scale-[1.02] sm:p-9"
            style={{ background: project.cover.color }}
          >
            {project.cover.logo ? (
              <img
                src={project.cover.logo}
                alt=""
                className="h-7 w-auto self-start object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            ) : (
              <span className="font-mono text-[13px] opacity-80">{project.cover.label}</span>
            )}
            {project.stats?.[0] && (
              <div>
                <div className="text-[clamp(40px,5vw,60px)] leading-none" style={{ fontWeight: 500, letterSpacing: "-0.04em" }}>
                  {project.stats[0].value}
                </div>
                <div className="mt-3 text-[15px] opacity-75">{project.stats[0].label}</div>
              </div>
            )}
          </div>
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
        <span className="min-w-0 flex-1 truncate text-[17px]" style={{ fontWeight: 500, color: "var(--ink)" }}>
          {project.title}
        </span>
        <span className="shrink-0 font-mono text-[12px] tabular-nums" style={{ color: "var(--faint)" }}>
          {project.year}
        </span>
      </div>
      <p className="mt-1 pl-[34px] text-[14.5px] leading-[1.6]" style={{ color: "var(--muted)" }}>
        {project.tagline}
      </p>
      {project.stats && (
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 pl-[34px] text-[14px]">
          {project.stats.map((stat) => (
            <span key={stat.label} style={{ color: "var(--muted)" }}>
              <span className="tabular-nums" style={{ fontWeight: 500, color: "var(--ink)" }}>
                {stat.value}
              </span>{" "}
              {stat.label}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

function Tile({ src, alt, rotate }: { src: string; alt: string; rotate: number }) {
  return (
    <img
      src={src}
      alt={alt}
      className="mx-[0.08em] inline-block h-[0.82em] w-[0.82em] rounded-[0.16em] object-cover align-[-0.08em] transition-transform duration-300 hover:rotate-0 hover:scale-110"
      style={{ transform: `rotate(${rotate}deg)`, boxShadow: "0 4px 14px rgba(35, 33, 28, 0.14)" }}
    />
  );
}

const NAV = [
  { id: "work", label: "Work" },
  { id: "principles", label: "Principles" },
  { id: "experience", label: "Experience" },
];

export function Portfolio() {
  const [params] = useSearchParams();
  const open = findDesignProject(params.get("project") ?? "");

  useEffect(() => {
    document.title = open ? `${open.title} - Paulo Ramirez` : "Portfolio - Paulo Ramirez";
  }, [open]);

  return (
    <div className="portfolio min-h-screen">
      <main className="mx-auto max-w-[1120px] px-6 pb-40 pt-16 sm:px-10 sm:pt-24">
        <h1
          className="max-w-[18ch] text-[clamp(40px,6.4vw,84px)] leading-[1.08]"
          style={{ fontWeight: 500, letterSpacing: "-0.04em", color: "var(--ink)" }}
        >
          Hi, I’m Paulo.
          <Tile src="/three.png" alt="Paulo" rotate={-4} /> I design and build software{" "}
          <span className="mr-[0.1em] inline-flex align-[-0.08em]">
            {experience.map((e, i) => (
              <img
                key={e.name}
                src={e.logo}
                alt={e.name}
                className="relative inline-block h-[0.82em] w-[0.82em] rounded-[0.16em] object-cover transition-transform duration-300 hover:z-10 hover:-translate-y-[0.08em] hover:rotate-0"
                style={{
                  marginLeft: i === 0 ? 0 : "-0.16em",
                  zIndex: experience.length - i,
                  transform: `rotate(${[5, -4, 7][i % 3]}deg)`,
                  boxShadow: "0 4px 14px rgba(35, 33, 28, 0.16)",
                  border: "2px solid var(--bg)",
                }}
              />
            ))}
          </span>{" "}
          that feels simple, even when the problem isn’t.
        </h1>

        <div className="mt-16 flex max-w-[60ch] flex-col gap-5 text-[17px] leading-[1.65] sm:mt-24" style={{ color: "var(--muted)" }}>
          <p>
            What I care about most is making complex products feel simple and intuitive, so people understand a
            screen at a glance and can get their work done without thinking about the interface. That means
            software that works well right out of the box, with room to customize it for the people who want more.
          </p>
          <p>
            Most of what I’ve built is data-heavy: dashboards for settlements, deliveries and calls. In all of it, my
            focus has been the same: software that drives real business outcomes and gives teams a clear picture of
            where things stand.
          </p>
          <p>
            Currently co-founder & CTO of{" "}
            <a
              href="https://vetpal.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-1 underline-offset-4"
              style={{ color: "var(--ink)" }}
            >
              Vetpal
            </a>
            , where I lead product, design and engineering. Based in Berlin.
          </p>
        </div>

        <div className="mt-8 flex gap-6 text-[15px]">
          <a
            href="https://www.linkedin.com/in/paulo-ramirez-cedenos/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 underline decoration-1 underline-offset-4"
            style={{ color: "var(--ink)" }}
          >
            LinkedIn
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>

        <section id="work" className="scroll-mt-10 pt-28">
          <h2 className="text-[22px]" style={{ fontWeight: 500, letterSpacing: "-0.02em", color: "var(--ink)" }}>
            Selected work
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
            {visibleProjects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>

        <section id="principles" className="scroll-mt-10 pt-28">
          <h2 className="text-[22px]" style={{ fontWeight: 500, letterSpacing: "-0.02em", color: "var(--ink)" }}>
            How I work
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-3">
            {designPrinciples.map((p, i) => (
              <div key={p.title} className="pt-5" style={{ borderTop: "1px solid var(--hairline)" }}>
                <span className="font-mono text-[12px] tabular-nums" style={{ color: "var(--accent)" }}>
                  {num(i)}
                </span>
                <h3 className="mt-3 text-[17px]" style={{ fontWeight: 500, color: "var(--ink)" }}>
                  {p.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6]" style={{ color: "var(--muted)" }}>
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-10 pt-28">
          <h2 className="text-[22px]" style={{ fontWeight: 500, letterSpacing: "-0.02em", color: "var(--ink)" }}>
            Experience
          </h2>
          <div className="mt-8 flex flex-col">
            {experience.map((e) => (
              <a
                key={e.url}
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 py-6"
                style={{ borderTop: "1px solid var(--hairline)" }}
              >
                <img
                  src={e.logo}
                  alt={e.name}
                  width={32}
                  height={32}
                  className="block shrink-0"
                  style={{ width: 32, height: 32, borderRadius: 7 }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex h-8 items-center gap-1.5">
                    <span className="text-[17px]" style={{ fontWeight: 500, color: "var(--ink)" }}>
                      {e.name}
                    </span>
                    <ArrowUpRight
                      size={15}
                      style={{ color: "var(--faint)" }}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                    <span className="ml-auto shrink-0 font-mono text-[12px] tabular-nums" style={{ color: "var(--faint)" }}>
                      {e.years}
                    </span>
                  </div>
                  <p className="max-w-[62ch] text-[15px] leading-[1.6]" style={{ color: "var(--muted)" }}>
                    {e.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer className="pt-28 text-center font-mono text-[12px]" style={{ color: "var(--faint)" }}>
          Made in Berlin
        </footer>
      </main>

      <nav
        aria-label="Sections"
        className="fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full p-1.5"
        style={{
          background: "rgba(255, 255, 255, 0.82)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid var(--hairline)",
          boxShadow: "0 8px 30px rgba(35, 33, 28, 0.1)",
        }}
      >
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-full px-4 py-2 text-[14px] transition-colors hover:bg-[var(--kbd-bg)]"
            style={{ color: "var(--muted)" }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <ProjectDialog project={open} />
    </div>
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

interface FigureProps {
  fit?: boolean; // equal-size white card, for side-by-side crops of different shapes
  media: ProjectImage | undefined;
  name: string;
  number: number;
  caption: string | undefined;
  title: string;
}

function Figure({ fit, media, name, number, caption, title }: FigureProps) {
  if (!media) {
    // Missing files only show up locally, as a reminder of what to add.
    if (import.meta.env.MODE !== "development") return null;
    return (
      <div
        className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-1 rounded-[10px] px-4 text-center font-mono text-[12px]"
        style={{ border: "1px dashed var(--faint)", color: "var(--faint)" }}
      >
        <span>{`add ${name}.jpg`}</span>
        {caption && <span>{caption}</span>}
      </div>
    );
  }

  return (
    <figure>
      {fit ? (
        <div
          className="flex aspect-[4/3] items-center justify-center overflow-hidden p-5"
          style={{ ...frame, background: "#ffffff" }}
        >
          <Media
            media={media}
            alt={caption ?? `${title} ${num(number)}`}
            eager={false}
            className="block max-h-full max-w-full object-contain"
          />
        </div>
      ) : (
        <Media
          media={media}
          alt={caption ?? `${title} ${num(number)}`}
          eager={number === 0}
          className="block h-auto w-full"
          style={frame}
        />
      )}
      <figcaption className="mt-3 flex gap-3 font-mono text-[12px] leading-[1.6]" style={{ color: "var(--faint)" }}>
        <span className="shrink-0 tabular-nums" style={{ color: "var(--accent)" }}>
          fig. {num(number)}
        </span>
        {caption && <span>{caption}</span>}
      </figcaption>
    </figure>
  );
}

function Section({ index, section, figures, title }: {
  index: number;
  section: CaseSection;
  figures: Omit<FigureProps, "title">[];
  title: string;
}) {
  return (
    <section className="mt-16 pt-8" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="flex items-baseline gap-3">
        <span className="w-[22px] shrink-0 font-mono text-[12px] tabular-nums" style={{ color: "var(--accent)" }}>
          {num(index)}
        </span>
        <h2 className="text-[24px] leading-[1.2]" style={{ fontWeight: 400, letterSpacing: "-0.02em" }}>
          {section.title}
        </h2>
      </div>

      {section.body.length > 0 && (
        <div className="mt-5 flex flex-col gap-5">
          {section.body.map((paragraph, i) => (
            <p key={i} className="text-[15.5px] leading-[1.7]" style={{ color: "var(--prose)" }}>
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {section.quotes && (
        <div className="mt-8 flex flex-col gap-4">
          {section.quotes.map((quote, i) => (
            <blockquote
              key={i}
              className="pl-5 text-[20px] leading-[1.45]"
              style={{ borderLeft: "2px solid var(--accent)", color: "var(--ink)" }}
            >
              “{quote}”
            </blockquote>
          ))}
        </div>
      )}

      {figures.length > 0 && (
        <div
          className={
            section.phones
              ? "mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3"
              : section.pair
                ? "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
                : "mt-10 flex flex-col gap-12"
          }
        >
          {figures.map((f) => (
            <Figure key={f.name} {...f} fit={section.pair} title={title} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectBody({ project, onClose }: { project: DesignProject; onClose: () => void }) {
  // Keep the original entry's state when stepping, so closing still knows whether to go back.
  const { state } = useLocation();
  const images = projectImages(project.slug);
  const index = visibleProjects.indexOf(project);
  const prev = visibleProjects[index - 1];
  const next = visibleProjects[index + 1];

  // Figures are numbered in reading order: section media first, then the rest.
  const sectionNames = (project.sections ?? []).flatMap((sec) => sec.media ?? []);
  const rest = images.filter((img) => !sectionNames.includes(img.name));
  const order = [...sectionNames, ...rest.map((img) => img.name)];
  const figure = (name: string) => ({
    media: images.find((img) => img.name === name),
    name,
    number: order.indexOf(name),
    caption: project.captions?.[name],
  });

  return (
    <div tabIndex={-1} autoFocus className="px-6 pb-12 outline-none sm:px-12">
      <div
        className="sticky top-0 z-10 -mx-6 flex items-center justify-between px-6 py-4 sm:-mx-12 sm:px-12"
        style={{ background: "var(--bg)" }}
      >
        <span className="font-mono text-[12px] tabular-nums" style={{ color: "var(--faint)" }}>
          <span style={{ color: "var(--accent)" }}>{num(index)}</span> / {num(visibleProjects.length - 1)}
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

      {project.stats && (
        <div className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
          {project.stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-[34px] leading-none tabular-nums" style={{ fontWeight: 500, letterSpacing: "-0.03em" }}>
                {stat.value}
              </div>
              <div className="mt-2 text-[14px]" style={{ color: "var(--muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <dl
        className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 py-6 sm:grid-flow-col sm:auto-cols-fr sm:grid-cols-none"
        style={{ borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}
      >
        {project.year && <Meta label="Year">{project.year}</Meta>}
        <Meta label="Role">{project.roles.join(", ")}</Meta>
        <Meta label="Tools">{project.tools.join(", ")}</Meta>
        {project.usage && <Meta label="Usage">{project.usage}</Meta>}
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

      <div className="mt-10 flex flex-col gap-5">
        {project.body.map((paragraph, i) => (
          <p key={i} className="text-[15.5px] leading-[1.7]" style={{ color: "var(--prose)" }}>
            {paragraph}
          </p>
        ))}
      </div>

      {project.interactive === "places" && (
        <Suspense fallback={<div className="mt-12 h-[400px]" />}>
          <Places />
        </Suspense>
      )}

      {project.sections?.map((section, i) => (
        <Section key={section.title} index={i} section={section} figures={(section.media ?? []).map(figure)} title={project.title} />
      ))}

      {images.length === 0 && !project.sections && !project.interactive ? (
        import.meta.env.MODE === "development" && <p className="mt-10 font-mono text-[13px]" style={{ color: "var(--faint)" }}>
          {`// no images yet — add them to src/assets/projects/${project.slug}/`}
        </p>
      ) : (
        rest.length > 0 && (
          <div className="mt-12 flex flex-col gap-12">
            {rest.map((img) => (
              <Figure key={img.src} {...figure(img.name)} title={project.title} />
            ))}
          </div>
        )
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
