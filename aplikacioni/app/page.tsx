
import Link from "next/link";

import KartaUdhetimi from "@/components/KartaUdhetimi";
import { lexoUdhetimet, type Udhetim } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

export default async function Home() {
  let udhetimet: Udhetim[];

  try {
    udhetimet = await lexoUdhetimet();
  } catch {
    return (
      <main className="page-shell">
        <div className="phone-shell">
          <header className="mobile-header mobile-header--list">
            <p className="eyebrow">RideShare</p>
            <h1>Udhëtime të disponueshme</h1>
          </header>
          <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
          <Link href="/" className="primary-button">
            Provo përsëri
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="phone-shell">
        <header className="mobile-header mobile-header--list">
          <p className="eyebrow">RideShare</p>
          <h1>Udhëtime të disponueshme</h1>
        </header>

        <section className="ride-list" aria-label="Lista e udhëtimeve">
          {udhetimet.length === 0 ? (
            <p>Nuk ka udhëtime për momentin.</p>
          ) : (
            udhetimet.map((udhetim) => (
              <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
            ))
          )}
        </section>
      </div>
    </main>
  );
}
