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
  const solid = tone === "on-field" ? "var(--field-fg)" : "var(--field)";
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
    <header className="mx-auto w-full max-w-6xl px-6 pt-28 pb-14 md:px-10 md:pt-36 md:pb-20">
      <p className="text-sm text-muted">{kicker}</p>
      <h1 className="mt-6 max-w-4xl text-4xl font-medium tracking-tight text-fg md:text-6xl">
        {title}
      </h1>
      {lede ? (
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
      ) : null}
    </header>
  );
}

export function Crumbs({ items }: { items: { to?: string; label: string }[] }) {
  return (
    <nav aria-label="Drobečková navigace" className="mx-auto w-full max-w-6xl px-6 pt-24 md:px-10 md:pt-28">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-3">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.to && !last ? (
                <Link to={item.to} className="transition-colors duration-500 hover:text-fg">
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
      className="press inline-flex min-h-11 items-center bg-field px-5 text-sm text-field-fg transition-colors duration-500 hover:bg-field-deep"
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
        "inline-flex min-h-11 items-center text-sm text-fg underline decoration-line underline-offset-4 transition-colors duration-500 hover:decoration-fg",
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
      <div className="photo-frame overflow-hidden bg-surface">
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
      {caption ? <figcaption className="mt-4 text-sm text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
