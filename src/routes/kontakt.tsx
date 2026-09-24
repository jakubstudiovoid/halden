import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { cities, site, topics } from "@/content/site";
import { inquirySchema, submitInquiry } from "@/lib/inquiry";
import { pageHead } from "@/lib/meta";
import { JsonLd, PageHeader } from "@/components/site/ui";

export const Route = createFileRoute("/kontakt")({
  head: () =>
    pageHead(
      "Kontakt",
      "Napište Haldenu. Odpovídáme do dvou pracovních dnů. První kontakt je písemný.",
    ),
  component: ContactPage,
});

const empty = {
  name: "",
  email: "",
  topic: "",
  message: "",
  consent: false,
  website: "",
};

function ContactPage() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = inquirySchema.safeParse({
      ...values,
      consent: values.consent ? true : false,
      topic: values.topic,
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("idle");
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await submitInquiry({ data: parsed.data });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Kontakt — Halden",
          description: "Písemný kontakt na advokátní kancelář Halden.",
          mainEntity: {
            "@type": "LegalService",
            name: site.legalName,
            email: site.email,
          },
        }}
      />
      <PageHeader
        kicker="Kontakt"
        title="První zpráva stačí krátká."
        lede="Odpovídáme do dvou pracovních dnů. Když věc nevezmeme, řekneme to stejně rychle. Telefon veřejně nedáváme — první kontakt je písemný."
      />
      <div className="mx-auto grid max-w-6xl gap-16 px-6 pb-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          {status === "sent" ? (
            <p role="status" className="max-w-xl text-2xl font-medium tracking-tight">
              Děkujeme. Zpráva je připravená. V této prezentaci se neukládá ani neodesílá — v provozu
              odchází partnerovi, který by věc vedl.
            </p>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-8">
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label>
                  Web
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={(event) => setValues({ ...values, website: event.target.value })}
                  />
                </label>
              </div>
              <Field
                id="jmeno"
                label="Jméno"
                autoComplete="name"
                value={values.name}
                error={errors.name}
                onChange={(name) => setValues({ ...values, name })}
              />
              <Field
                id="email"
                label="E-mail"
                type="email"
                autoComplete="email"
                value={values.email}
                error={errors.email}
                onChange={(email) => setValues({ ...values, email })}
              />
              <div>
                <label htmlFor="tema" className="text-sm text-muted">
                  Čeho se věc týká
                </label>
                <select
                  id="tema"
                  name="topic"
                  value={values.topic}
                  onChange={(event) => setValues({ ...values, topic: event.target.value })}
                  aria-invalid={Boolean(errors.topic)}
                  aria-describedby={errors.topic ? "tema-chyba" : undefined}
                  className="mt-3 w-full border-b border-line bg-transparent py-3 text-fg outline-none"
                >
                  <option value="">Vyberte</option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
                {errors.topic ? (
                  <p id="tema-chyba" className="mt-2 text-sm text-fg">
                    {errors.topic}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="zprava" className="text-sm text-muted">
                  Zpráva
                </label>
                <textarea
                  id="zprava"
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={(event) => setValues({ ...values, message: event.target.value })}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "zprava-chyba" : undefined}
                  className="mt-3 w-full resize-y border-b border-line bg-transparent py-3 text-fg outline-none"
                />
                {errors.message ? (
                  <p id="zprava-chyba" className="mt-2 text-sm text-fg">
                    {errors.message}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="flex items-start gap-3 text-sm leading-relaxed">
                  <input
                    type="checkbox"
                    className="mt-1 size-4 accent-field"
                    checked={values.consent}
                    onChange={(event) => setValues({ ...values, consent: event.target.checked })}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={errors.consent ? "souhlas-chyba" : undefined}
                  />
                  <span>
                    Chci pokračovat. V této prezentaci se zpráva neukládá ani neodesílá. Více v{" "}
                    <a href="/soukromi" className="underline decoration-line underline-offset-4">
                      zásadách soukromí
                    </a>
                    .
                  </span>
                </label>
                {errors.consent ? (
                  <p id="souhlas-chyba" className="mt-2 text-sm text-fg">
                    {errors.consent}
                  </p>
                ) : null}
              </div>
              {status === "error" ? (
                <p role="alert" className="text-sm">
                  Zprávu se nepodařilo připravit. Zkuste to znovu, nebo napište na {site.email}.
                </p>
              ) : null}
              <button
                type="submit"
                disabled={status === "sending"}
                className="press inline-flex min-h-11 items-center bg-field px-5 text-sm text-field-fg disabled:opacity-60"
              >
                {status === "sending" ? "Odesílám" : "Odeslat"}
              </button>
            </form>
          )}
        </div>
        <aside className="md:col-span-5">
          <p className="text-sm text-muted">Přímo</p>
          <a href={`mailto:${site.email}`} className="mt-3 inline-flex min-h-11 items-center text-lg">
            {site.email}
          </a>
          <ul className="mt-10 space-y-8 border-t border-line pt-8">
            {cities.map((city) => (
              <li key={city.name}>
                <h2 className="text-xl font-medium">{city.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{city.text}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-muted">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-chyba` : undefined}
        className="mt-3 w-full border-b border-line bg-transparent py-3 text-fg outline-none"
      />
      {error ? (
        <p id={`${id}-chyba`} className="mt-2 text-sm text-fg">
          {error}
        </p>
      ) : null}
    </div>
  );
}
