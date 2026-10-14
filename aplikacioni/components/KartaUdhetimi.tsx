import Link from "next/link";

import type { Udhetim } from "@/lib/udhetimet";

type KartaUdhetimiProps = {
  udhetim: Udhetim;
};

export default function KartaUdhetimi({ udhetim }: KartaUdhetimiProps) {
  const statusTeksti =
    udhetim.vendetELira === 0
      ? "E mbushur"
      : `${udhetim.vendetELira} vende të lira`;

  return (
    <article className="ride-card">
      <div className="ride-card__top">
        <span className="ride-card__badge">#{udhetim.id}</span>
        <span
          className={
            udhetim.vendetELira === 0
              ? "ride-card__status ride-card__status--sold"
              : "ride-card__status"
          }
        >
          {statusTeksti}
        </span>
      </div>

      <h2 className="ride-card__title">
        {udhetim.shoferi}: {udhetim.nisja} → {udhetim.destinacioni}
      </h2>

      <div className="ride-card__info">
        <p>Ora: {udhetim.ora}</p>
        <p>Vendet e lira: {udhetim.vendetELira}</p>
      </div>

      <Link href={`/udhetimi/${udhetim.id}`} className="ride-card__link">
        Shiko detajet
      </Link>
    </article>
  );
}
