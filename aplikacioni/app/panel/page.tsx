import Link from "next/link";

import Hyrja from "@/components/Hyrja";
import { profiliIm } from "@/lib/lejet";

import { ruajOren } from "./actions";

export const dynamic = "force-dynamic";

const mesazhet: Record<string, string> = {
  hyr: "Hyr në llogari para se të ndryshosh udhëtimin.",
  ndaluar: "Nuk ke leje për këtë udhëtim. Ora nuk ndryshoi.",
  fushe: "Shkruaj një orë të vlefshme, p.sh. 08:25. ID duhet të jetë 1, 2 ose 3.",
  ruajtur: "Ora u ruajt me sukses. Kontrollo listën dhe detajet.",
  databaza: "Nuk u lidhëm me databazën. Kontrollo Neon dhe provo përsëri.",
};

type PanelProps = {
  searchParams: Promise<{ m?: string }>;
};

export default async function Panel({ searchParams }: PanelProps) {
  const { m } = await searchParams;
  let profil: Awaited<ReturnType<typeof profiliIm>>;

  try {
    profil = await profiliIm();
  } catch {
    return (
      <main className="page-shell">
        <div className="phone-shell">
          <h1>Paneli im</h1>
          <p role="alert">{mesazhet.databaza}</p>
          <Link href="/panel">Provo përsëri</Link>
        </div>
      </main>
    );
  }

  const oauthConfigured = Boolean(
    process.env.GITHUB_ID &&
      process.env.GITHUB_SECRET &&
      process.env.NEXTAUTH_SECRET,
  );

  return (
    <main className="page-shell">
      <div className="phone-shell">
        <header className="mobile-header">
          <Link href="/" className="back-link">
            ← Kthehu te udhëtimet
          </Link>
          <h1>Paneli im</h1>
        </header>

        {m && mesazhet[m] ? <p role="status">{mesazhet[m]}</p> : null}

        {profil ? (
          <>
            <p>
              Përshëndetje, {profil.emri}. Roli: <strong>{profil.roli}</strong>.
            </p>
            <p>
              ID ime GitHub: <code>{profil.id}</code>
            </p>
          </>
        ) : (
          <p>Lista është publike. Për panelin, hyr me llogarinë tënde GitHub.</p>
        )}

        <Hyrja brenda={Boolean(profil)} oauthConfigured={oauthConfigured} />

        {profil?.roli === "shofer" ? (
          <form action={ruajOren} className="panel-form">
            <h2>Ndrysho orën e udhëtimit tim</h2>
            <input type="hidden" name="id" value="2" />
            <label htmlFor="ora">Ora e re</label>
            <input
              id="ora"
              name="ora"
              type="time"
              defaultValue="08:15"
              required
            />
            <button type="submit">Ruaj orën</button>
            <p>
              Paneli provon ID 2; serveri kontrollon rolin dhe pronarin edhe nëse
              ndryshohet ID-ja e formularit.
            </p>
          </form>
        ) : profil ? (
          <p>
            Si udhëtar mund t’i shohësh udhëtimet, por nuk mund të ndryshosh orën
            e shoferit.
          </p>
        ) : null}

        <p>Kërkesa për vend mbetet simulim këtë javë.</p>
      </div>
    </main>
  );
}
