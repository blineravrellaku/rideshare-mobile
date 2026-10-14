import Link from "next/link";
import { notFound } from "next/navigation";

import { gjejUdhetimin } from "@/lib/udhetimet";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

type UdhëtimDetajetProps = {
  params: Promise<{ id: string }>;
};

export default async function UdhëtimDetajet({ params }: UdhëtimDetajetProps) {
  const { id } = await params;
  const udhetim = gjejUdhetimin(id);

  if (!udhetim) {
    notFound();
  }

  const kaVende = udhetim.vendetELira > 0;

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
          <p className="detail-card__eyebrow">Shoferi: {udhetim.shoferi}</p>
          <h2 className="detail-card__title">
            {udhetim.nisja} → {udhetim.destinacioni}
          </h2>

          <div className="detail-grid">
            <div>
              <span>Ora e nisjes</span>
              <strong>{udhetim.ora}</strong>
            </div>
            <div>
              <span>Kohëzgjatja</span>
              <strong>{udhetim.koheZgjatja}</strong>
            </div>
            <div>
              <span>Vendet e lira</span>
              <strong>{udhetim.vendetELira}</strong>
            </div>
            <div>
              <span>Çmimi</span>
              <strong>{udhetim.cmimi} €</strong>
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
