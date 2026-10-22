import Link from "next/link";
import { notFound } from "next/navigation";

import { gjejUdhetimin } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

type KerkesaProps = {
  params: Promise<{ id: string }>;
};

export default async function KerkesaPage({ params }: KerkesaProps) {
  const { id } = await params;
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

  if (udhetim.vende === 0) {
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
          <div className="status-pill">Simulim: Në pritje</div>
          <p>
            Kërkesa juaj për udhëtimin {udhetim.nisja} → {udhetim.destinacioni} është
            simulim. Nuk ruhet kërkesë dhe shoferi nuk njoftohet.
          </p>
          <p>Ruajtjen dhe konfirmimin real do t’i shtojmë më vonë.</p>
          <Link href={`/udhetimi/${udhetim.id}`} className="secondary-button">
            Kthehu te detajet
          </Link>
        </section>
      </div>
    </main>
  );
}
