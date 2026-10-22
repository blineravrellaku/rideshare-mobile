import Link from "next/link";
import { notFound } from "next/navigation";

import { gjejUdhetimin } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

type UdhëtimDetajetProps = {
  params: Promise<{ id: string }>;
};

export default async function UdhëtimDetajet({ params }: UdhëtimDetajetProps) {
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
              ← Kthehu?
            </Link>
            <h1>Detajet e udhëtimit</h1>
          </header>
          <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        </div>
      </main>
    );
  }
  if (!udhetim) {
    notFound();
  }

  const kaVende = udhetim.vende > 0;

  return (
    <main className="page-shell">
      <div className="phone-shell">
        <header className="mobile-header">
          <Link href="/" className="back-link">
            ← Kthehu
          </Link>
          <h1>Detajet e udhëtimit</h1>
        </header>

        <section className="detail-card">
          <p className="detail-card__eyebrow">Nisja: {udhetim.nisja}</p>
          <h2 className="detail-card__title">
            {udhetim.nisja} → {udhetim.destinacioni}
          </h2>

          <div className="detail-grid">
            <div>
              <span>Ora e nisjes</span>
              <strong>{udhetim.ora}</strong>
            </div>
            <div>
              <span>Vendtakimi</span>
              <strong>{udhetim.vendtakimi}</strong>
            </div>
            <div>
              <span>Vendet e lira</span>
              <strong>{udhetim.vende}</strong>
            </div>
            <div>
              <span>Destinacioni</span>
              <strong>{udhetim.destinacioni}</strong>
            </div>
          </div>

          {kaVende ? (
            <Link href={`/udhetimi/${udhetim.id}/kerkesa`} className="primary-button">
              Kërko vend
            </Link>
          ) : (
            <button className="primary-button primary-button--disabled" disabled>
              Nuk ka vende të lira
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
