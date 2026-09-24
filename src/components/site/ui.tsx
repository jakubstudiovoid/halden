import { Link } from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Mark({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "on-field";
}) {
  const solid = tone === "on-field" ? "var(--field-fg)" : "var(--mark)";
  const stroke = tone === "on-field" ? "var(--field-fg)" : "currentColor";
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="5" y="11" width="15" height="15" rx="3.5" fill={solid} />
      <rect
        x="12"
        y="6"
        width="15"
        height="15"
        rx="3.5"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-in");
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="mx-auto w-full max-w-6xl px-6 pt-40 pb-24 md:px-16 md:pt-56 md:pb-32">
      <p className="kicker">{kicker}</p>
      <h1 className="display mt-10 max-w-3xl text-4xl text-fg md:text-7xl">{title}</h1>
      {lede ? (
        <p className="mt-10 max-w-md text-base leading-relaxed text-muted">{lede}</p>
      ) : null}
    </header>
  );
}

export function Crumbs({ items }: { items: { to?: string; label: string }[] }) {
  return (
    <nav aria-label="Drobečková navigace" className="mx-auto w-full max-w-6xl px-6 pt-32 md:px-16 md:pt-36">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-3">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.to && !last ? (
                <Link to={item.to} className="transition-colors duration-1000 hover:text-fg">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-fg" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function FieldLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className="press btn btn-solid"
    >
      {children}
    </Link>
  );
}

export function QuietLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "link-draw inline-flex min-h-11 items-center text-sm text-fg",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Photo({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure>
      <div className="photo-frame overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="photo h-auto w-full"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </div>
      {caption ? <figcaption className="mt-8 max-w-xs text-sm leading-relaxed text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
