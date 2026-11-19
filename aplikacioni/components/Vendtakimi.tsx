"use client";

import { useState } from "react";

export default function Vendtakimi() {
  const [vendtakimi, setVendtakimi] = useState("");
  const [vendndodhjaLejuar, setVendndodhjaLejuar] = useState(false);
  const [poKerkohetLeja, setPoKerkohetLeja] = useState(false);
  const [mesazhi, setMesazhi] = useState(
    "Vendndodhja nuk kërkohet pa shtypur butonin.",
  );
  const [pritjaPerfundoi, setPritjaPerfundoi] = useState(false);

  function kerkoVendndodhjen() {
    if (!navigator.geolocation) {
      setMesazhi(
        "Shfletuesi nuk e mbështet vendndodhjen. Shkruaj vendtakimin manualisht.",
      );
      return;
    }

    setPoKerkohetLeja(true);
    setMesazhi("Po presim përgjigjen për lejen e vendndodhjes.");
    navigator.geolocation.getCurrentPosition(
      () => {
        setVendndodhjaLejuar(true);
        setPoKerkohetLeja(false);
        setMesazhi(
          "Leja u pranua. Koordinatat nuk shfaqen dhe nuk dërgohen.",
        );
      },
      (error) => {
        setPoKerkohetLeja(false);
        if (error.code === error.PERMISSION_DENIED) {
          setMesazhi(
            "Leja u refuzua. Shkruaj vendtakimin manualisht për të vazhduar.",
          );
        } else {
          setMesazhi(
            "Vendndodhja nuk u mor. Mund ta shkruash vendtakimin manualisht.",
          );
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 },
    );
  }

  const kaVendtakim = vendndodhjaLejuar || vendtakimi.trim().length > 0;

  return (
    <section className="pickup-card" aria-labelledby="pickup-title">
      <h2 id="pickup-title">Vendtakimi</h2>
      <p>Leja e vendndodhjes kërkohet vetëm pasi të zgjedhësh këtë opsion.</p>
      <button
        className="secondary-button"
        type="button"
        onClick={kerkoVendndodhjen}
        disabled={poKerkohetLeja || vendndodhjaLejuar}
      >
        {vendndodhjaLejuar
          ? "Vendndodhja u lejua"
          : poKerkohetLeja
            ? "Po kërkohet leja…"
            : "Përdor vendndodhjen time"}
      </button>
      <label className="pickup-label" htmlFor="manual-pickup">
        Ose shkruaj vendtakimin manualisht
      </label>
      <input
        id="manual-pickup"
        value={vendtakimi}
        onChange={(event) => {
          setVendtakimi(event.target.value);
          setPritjaPerfundoi(false);
        }}
        placeholder="p.sh. Hyrja kryesore e AAB-së"
      />
      <p className="pickup-message" role="status" aria-live="polite">
        {mesazhi}
      </p>
      <button
        className="primary-button"
        type="button"
        disabled={!kaVendtakim || pritjaPerfundoi}
        onClick={() => setPritjaPerfundoi(true)}
      >
        Simulo përfundimin e pritjes
      </button>
      {pritjaPerfundoi ? (
        <p className="pickup-message" role="status">
          Simulimi përfundoi; asnjë vendndodhje nuk u publikua.
        </p>
      ) : null}
    </section>
  );
}
