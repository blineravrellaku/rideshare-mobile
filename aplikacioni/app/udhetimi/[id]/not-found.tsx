import Link from "next/link";

export default function UdhëtimNotFound() {
  return (
    <main className="page-shell">
      <div className="phone-shell phone-shell--centered">
        <div className="empty-state">
          <h1>Udhëtimi nuk u gjet</h1>
          <Link href="/" className="primary-button">
            Kthehu te lista
          </Link>
        </div>
      </div>
    </main>
  );
}
