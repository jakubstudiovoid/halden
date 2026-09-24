import { createFileRoute, Link } from "@tanstack/react-router";
import { cities, site } from "@/content/site";
import { pageHead } from "@/lib/meta";
import { PageHeader, Photo } from "@/components/site/ui";

export const Route = createFileRoute("/atelier")({
  head: () =>
    pageHead(
      "Ateliér",
      "Halden vznikl v Praze v roce 2009. Od roku 2018 má stůl ve Vídni. Jedna kancelář, jeden standard psaní.",
    ),
  component: StudioPage,
});

function StudioPage() {
  return (
    <>
      <PageHeader
        kicker="Ateliér"
        title="Kancelář, ne síť."
        lede="Halden vznikl v Praze v roce 2009. Vídeň přibyla v roce 2018 jako stůl, ne jako druhá značka. Píše se u nás stejně na obou stranách hranice."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <Photo
            src="/media/corridor.jpg"
            alt="Dlouhá prázdná chodba z bledého dubu a modrošedé omítky, na konci denní světlo."
            width={1400}
            height={934}
          />
        </div>
        <div className="md:col-span-5 md:pt-16">
          <Photo
            src="/media/facade.jpg"
            alt="Noční fasáda z vápence s jedním úzkým oknem a teplým světlem uvnitř."
            width={1600}
            height={900}
            caption="Praha a Vídeň. Schůzka až po potvrzení."
          />
        </div>
      </div>
      <section className="mx-auto mt-20 grid max-w-6xl gap-12 px-6 md:grid-cols-12 md:px-10">
        <h2 className="text-3xl font-medium tracking-tight md:col-span-5">Proč ten název</h2>
        <div className="space-y-5 leading-relaxed text-muted md:col-span-7">
          <p>
            Ateliér proto, že věc má autora. Ne proto, že bychom byli méně přísní na paragraf. {site.lawyers}{" "}
            právníků drží jeden standard: krátký text, pojmenované riziko, partner, který větu podepíše.
          </p>
          <p>
            Nevedeme pobočky, které si půjčují logo. Když věc přesáhne to, co umíme, řekneme to a doporučíme
            někoho, kdo to umí líp. To je součást klidu, ne mezera v nabídce.
          </p>
          <p>
            Nejsme na žebříčcích úvodní strany. Důvěra je v tom, kdo věc vede a jak je napsaná. Referenci
            domluví partner, ne marketing.
          </p>
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-6xl px-6 pb-24 md:px-10" aria-labelledby="mesta">
        <h2 id="mesta" className="text-sm text-muted">
          Kde se potkáváme
        </h2>
        <ul className="mt-6 border-b border-line">
          {cities.map((city) => (
            <li key={city.name} className="grid gap-3 border-t border-line py-7 md:grid-cols-12">
              <h3 className="text-2xl font-medium md:col-span-3">{city.name}</h3>
              <p className="leading-relaxed text-muted md:col-span-7">{city.text}</p>
            </li>
          ))}
        </ul>
        <Link
          to="/lide"
          className="mt-10 inline-flex min-h-11 items-center text-sm underline decoration-line underline-offset-4"
        >
          Lidé v obou městech
        </Link>
      </section>
    </>
  );
}
