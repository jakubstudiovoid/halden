import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { topicIds } from "@/content/site";
import { submitInquiry } from "@/lib/inquiry";
import { pageHead } from "@/lib/meta";
import { JsonLd, PageHeader } from "@/components/site/ui";
import { RouteLink, useCopy, useLinks } from "@/i18n/locale";

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

export function ContactPage() {
  const { ui, site, cities } = useCopy();
  const links = useLinks();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const schema = z.object({
      name: z.string().trim().min(2, ui.errName).max(80, ui.errNameLong),
      email: z.string().trim().email(ui.errEmail).max(160, ui.errEmailLong),
      topic: z.enum(topicIds, { message: ui.errTopic }),
      message: z.string().trim().min(20, ui.errMessage).max(4000, ui.errMessageLong),
      consent: z.literal(true, { message: ui.errConsent }),
      website: z.string().max(200).optional(),
    });
    const parsed = schema.safeParse({
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
          name: ui.contact,
          description: ui.metaContact,
          mainEntity: {
            "@type": "LegalService",
            name: site.legalName,
            email: site.email,
          },
        }}
      />
      <PageHeader kicker={ui.contact} title={ui.contactTitle} lede={ui.contactLede} />
      <div className="mx-auto grid max-w-6xl gap-16 px-6 pb-24 md:grid-cols-12 md:px-16">
        <div className="md:col-span-7">
          {status === "sent" ? (
            <p role="status" className="max-w-xl text-2xl font-normal tracking-tight">
              {ui.sent}
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
                id="name"
                label={ui.name}
                autoComplete="name"
                value={values.name}
                error={errors.name}
                onChange={(name) => setValues({ ...values, name })}
              />
              <Field
                id="email"
                label={ui.email}
                type="email"
                autoComplete="email"
                value={values.email}
                error={errors.email}
                onChange={(email) => setValues({ ...values, email })}
              />
              <div>
                <label htmlFor="topic" className="text-sm text-muted">
                  {ui.topic}
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={values.topic}
                  onChange={(event) => setValues({ ...values, topic: event.target.value })}
                  aria-invalid={Boolean(errors.topic)}
                  aria-describedby={errors.topic ? "topic-error" : undefined}
                  className="line-field mt-2"
                >
                  <option value="">{ui.choose}</option>
                  {ui.topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.label}
                    </option>
                  ))}
                </select>
                {errors.topic ? (
                  <p id="topic-error" className="mt-2 text-sm text-fg">
                    {errors.topic}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-muted">
                  {ui.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={values.message}
                  onChange={(event) => setValues({ ...values, message: event.target.value })}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="line-field mt-2 resize-y"
                />
                {errors.message ? (
                  <p id="message-error" className="mt-2 text-sm text-fg">
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
                    aria-describedby={errors.consent ? "consent-error" : undefined}
                  />
                  <span>
                    {ui.consentBefore}{" "}
                    <RouteLink to={links.privacy} className="underline decoration-line underline-offset-4">
                      {ui.consentLink}
                    </RouteLink>
                    .
                  </span>
                </label>
                {errors.consent ? (
                  <p id="consent-error" className="mt-2 text-sm text-fg">
                    {errors.consent}
                  </p>
                ) : null}
              </div>
              {status === "error" ? (
                <p role="alert" className="text-sm">
                  {ui.sendError} {site.email}.
                </p>
              ) : null}
              <button type="submit" disabled={status === "sending"} className="press btn btn-solid disabled:opacity-60">
                {status === "sending" ? ui.sending : ui.send}
              </button>
            </form>
          )}
        </div>
        <aside className="md:col-span-5">
          <p className="text-sm text-muted">{ui.direct}</p>
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
        aria-describedby={error ? `${id}-error` : undefined}
        className="line-field mt-2"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-fg">
          {error}
        </p>
      ) : null}
    </div>
  );
}
