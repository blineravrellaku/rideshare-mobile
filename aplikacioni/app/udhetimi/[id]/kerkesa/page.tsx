import Link from "next/link";
import { notFound } from "next/navigation";

import Hyrja from "@/components/Hyrja";
import { lexoKerkesenTime, type StatusKerkese } from "@/lib/kerkesat";
import { profiliIm } from "@/lib/lejet";
import { gjejUdhetimin } from "@/lib/udhetimet";

import { dergoKerkese } from "./actions";

export const dynamic = "force-dynamic";

type KerkesaProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ m?: string }>;
};

const mesazhet: Record<string, string> = {
  hyr: "Hyr me GitHub para se të dërgosh kërkesë.",
  derguar: "Kërkesa u ruajt dhe pret përgjigjen e shoferit.",
  ekziston: "Ke tashmë një kërkesë për këtë udhëtim.",
  pa_vende: "Ky udhëtim nuk ka më vende të lira.",
  ndaluar: "Nuk ke leje për këtë veprim.",
  udhetim: "Udhëtimi nuk u gjet.",
  vetvetja: "Nuk mund të kërkosh vend në udhëtimin tënd.",
  databaza: "Nuk u lidhëm me databazën. Provo përsëri.",
};

const statuset: Record<StatusKerkese, string> = {
  ne_pritje: "Kërkesa jote pret përgjigjen e shoferit.",
  pranuar: "Shoferi e pranoi kërkesën tënde.",
  refuzuar: "Shoferi e refuzoi kërkesën tënde.",
};

export default async function KerkesaPage({
  params,
  searchParams,
}: KerkesaProps) {
  const { id } = await params;
  const { m } = await searchParams;
  let udhetim: Awaited<ReturnType<typeof gjejUdhetimin>>;

  try {
    udhetim = await gjejUdhetimin(id);
  } catch {
    return (
      <main className="page-shell">
        <div className="phone-shell">
          <header className="mobile-header">
            <Link href="/" className="back-link">
              ← Kthehu
            </Link>
            <h1>Kërkesa</h1>
          </header>
          <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        </div>
      </main>
    );
  }

  if (!udhetim) {
    notFound();
  }

  let profil: Awaited<ReturnType<typeof profiliIm>>;
  let status: StatusKerkese | null = null;
  try {
    profil = await profiliIm();
    if (profil) {
      status = await lexoKerkesenTime(udhetim.id, profil.id);
    }
  } catch {
    return (
      <main className="page-shell">
        <div className="phone-shell">
          <header className="mobile-header">
            <Link href={`/udhetimi/${udhetim.id}`} className="back-link">
              ← Kthehu te detajet
            </Link>
            <h1>Kërkesa</h1>
          </header>
          <p role="alert">{mesazhet.databaza}</p>
        </div>
      </main>
    );
  }

  if (udhetim.vende === 0 && !status) {
    return (
      <main className="page-shell">
        <div className="phone-shell">
          <header className="mobile-header">
            <Link href={`/udhetimi/${udhetim.id}`} className="back-link">
              ← Kthehu
            </Link>
            <h1>Kërkesa</h1>
          </header>
          <div className="empty-state">
            <h2>Nuk ka vende të lira</h2>
            {m && mesazhet[m] ? <p role="status">{mesazhet[m]}</p> : null}
            <Link href={`/udhetimi/${udhetim.id}`} className="primary-button">
              Kthehu te detajet
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="phone-shell">
        <header className="mobile-header">
          <Link href={`/udhetimi/${udhetim.id}`} className="back-link">
            ← Kthehu
          </Link>
          <h1>Kërkesa</h1>
        </header>

        <section className="request-card">
          <h2>{udhetim.nisja} → {udhetim.destinacioni}</h2>
          {m && mesazhet[m] ? <p role="status">{mesazhet[m]}</p> : null}
          {!profil ? (
            <>
              <p>Hyr me GitHub për t’i dërguar shoferit një kërkesë reale.</p>
              <Hyrja brenda={false} oauthConfigured={Boolean(
                process.env.GITHUB_ID &&
                  process.env.GITHUB_SECRET &&
                  process.env.NEXTAUTH_SECRET,
              )} />
            </>
          ) : status ? (
            <p role="status">{statuset[status]}</p>
          ) : (
            <>
              <p>Kërkesa ruhet në databazë dhe shoferi vendos nëse e pranon.</p>
              <form action={dergoKerkese} className="panel-form">
                <input type="hidden" name="udhetimId" value={udhetim.id} />
                <button type="submit">Dërgo kërkesën</button>
              </form>
            </>
          )}
          <Link href={`/udhetimi/${udhetim.id}`} className="secondary-button">
            Kthehu te detajet
          </Link>
        </section>
      </div>
    </main>
  );
}
