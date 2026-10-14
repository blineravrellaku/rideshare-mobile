import Link from "next/link";
import { notFound } from "next/navigation";

import { gjejUdhetimin } from "@/lib/udhetimet";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

type KerkesaProps = {
  params: Promise<{ id: string }>;
};

export default async function KerkesaPage({ params }: KerkesaProps) {
  const { id } = await params;
  const udhetim = gjejUdhetimin(id);

  if (!udhetim) {
    notFound();
  }

  if (udhetim.vendetELira === 0) {
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
            e regjistruar si simulim. Rezervimi nuk është real dhe nuk ka pagesë apo
            databazë të lidhur.
          </p>
          <Link href={`/udhetimi/${udhetim.id}`} className="secondary-button">
            Kthehu te detajet
          </Link>
        </section>
      </div>
    </main>
  );
}
