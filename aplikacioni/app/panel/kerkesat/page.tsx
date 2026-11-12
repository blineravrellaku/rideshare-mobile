import Link from "next/link";

import Hyrja from "@/components/Hyrja";
import { lexoKerkesatPerShofer } from "@/lib/kerkesat";
import { profiliIm } from "@/lib/lejet";

import { trajtoKerkese } from "./actions";

export const dynamic = "force-dynamic";

const mesazhet: Record<string, string> = {
  pranuar: "Kërkesa u pranua. Një vend u rezervua.",
  refuzuar: "Kërkesa u refuzua.",
  pa_vende: "Nuk ka më vende të lira për ta pranuar këtë kërkesë.",
  jo_ne_pritje: "Kjo kërkesë nuk pret më përgjigje.",
  ndaluar: "Nuk ke leje për këtë veprim.",
  databaza: "Nuk u lidhëm me databazën. Provo përsëri.",
};

type KerkesatProps = {
  searchParams: Promise<{ m?: string }>;
};

export default async function KerkesatShoferi({
  searchParams,
}: KerkesatProps) {
  const { m } = await searchParams;
  let profil: Awaited<ReturnType<typeof profiliIm>>;
  let kerkesat: Awaited<ReturnType<typeof lexoKerkesatPerShofer>> = [];

  try {
    profil = await profiliIm();
    if (profil?.roli === "shofer") {
      kerkesat = await lexoKerkesatPerShofer(profil.id);
    }
  } catch {
    return (
      <main className="page-shell">
        <div className="phone-shell">
          <h1>Kërkesat për udhëtime</h1>
          <p role="alert">{mesazhet.databaza}</p>
          <Link href="/panel">Kthehu te paneli</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="phone-shell">
        <header className="mobile-header">
          <Link href="/panel" className="back-link">
            ← Kthehu te paneli
          </Link>
          <h1>Kërkesat për udhëtime</h1>
        </header>

        {m && mesazhet[m] ? <p role="status">{mesazhet[m]}</p> : null}
        {!profil ? (
          <>
            <p>Hyr me llogarinë e shoferit për t’i parë kërkesat.</p>
            <Hyrja
              brenda={false}
              oauthConfigured={Boolean(
                process.env.GITHUB_ID &&
                  process.env.GITHUB_SECRET &&
                  process.env.NEXTAUTH_SECRET,
              )}
            />
          </>
        ) : profil.roli !== "shofer" ? (
          <p role="alert">Vetëm shoferi i udhëtimit mund t’i trajtojë kërkesat.</p>
        ) : kerkesat.length === 0 ? (
          <p>Nuk ka kërkesa në pritje për udhëtimet e tua.</p>
        ) : (
          <section className="ride-list" aria-label="Kërkesat në pritje">
            {kerkesat.map((kerkese) => (
              <article className="ride-card" key={kerkese.id}>
                <h2 className="ride-card__title">
                  {kerkese.nisja} → {kerkese.destinacioni}
                </h2>
                <p>Ora: {kerkese.ora}</p>
                <p>Kërkuesi: {kerkese.udhetar}</p>
                <p>
                  <Link href={`/udhetimi/${kerkese.udhetimId}`}>
                    Shiko udhëtimin
                  </Link>
                </p>
                <div className="request-actions">
                  <form action={trajtoKerkese}>
                    <input type="hidden" name="id" value={kerkese.id} />
                    <input type="hidden" name="veprimi" value="prano" />
                    <button type="submit">Prano dhe rezervo vendin</button>
                  </form>
                  <form action={trajtoKerkese}>
                    <input type="hidden" name="id" value={kerkese.id} />
                    <input type="hidden" name="veprimi" value="refuzo" />
                    <button type="submit" className="secondary-action">
                      Refuzo
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
