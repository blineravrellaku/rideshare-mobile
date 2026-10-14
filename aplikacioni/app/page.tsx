
import KartaUdhetimi from "@/components/KartaUdhetimi";
import { udhetimet } from "@/lib/udhetimet";

export default function Home() {
  return (
    <main className="page-shell">
      <div className="phone-shell">
        <header className="mobile-header mobile-header--list">
          <p className="eyebrow">RideShare</p>
          <h1>Udhëtime të disponueshme</h1>
        </header>

        <section className="ride-list" aria-label="Lista e udhëtimeve">
          {udhetimet.map((udhetim) => (
            <KartaUdhetimi key={udhetim.id} udhetim={udhetim} />
          ))}
        </section>
      </div>
    </main>
  );
}
