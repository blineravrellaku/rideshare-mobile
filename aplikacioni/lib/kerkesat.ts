import "server-only";

import { getSql } from "./db";
import { profiliIm } from "./lejet";

export type StatusKerkese = "ne_pritje" | "pranuar" | "refuzuar";

export type KerkeseShoferi = {
  id: string;
  udhetimId: string;
  udhetar: string;
  nisja: string;
  destinacioni: string;
  ora: string;
  krijuarMe: string;
};

export async function kerkoVend(udhetimId: string) {
  const profil = await profiliIm();
  if (!profil) return "hyr";
  if (!udhetimId || udhetimId.length > 64) return "udhetim";

  const sql = getSql();
  const rows = await sql`
    SELECT krijo_kerkese(${udhetimId}, ${profil.id}) AS status
  `;
  return String(rows[0]?.status ?? "gabim");
}

export async function lexoKerkesenTime(udhetimId: string, udhetarId: string) {
  const sql = getSql();
  const rows = await sql`
    SELECT status
    FROM kerkesat
    WHERE udhetim_id = ${udhetimId} AND udhetar_id = ${udhetarId}
  `;
  return (rows[0]?.status as StatusKerkese | undefined) ?? null;
}

export async function lexoKerkesatPerShofer(shoferId: string) {
  const sql = getSql();
  const rows = await sql`
    SELECT
      k.id::text AS id,
      k.udhetim_id AS "udhetimId",
      p.emri AS udhetar,
      u.nisja,
      u.destinacioni,
      u.ora,
      k.krijuar_me::text AS "krijuarMe"
    FROM kerkesat AS k
    JOIN udhetimet AS u ON u.id = k.udhetim_id
    JOIN profilet AS p ON p.github_id = k.udhetar_id
    WHERE u.shofer_id = ${shoferId}
      AND k.status = 'ne_pritje'
    ORDER BY k.krijuar_me, k.id
  `;
  return rows as KerkeseShoferi[];
}

export async function pergjigjuKerkeses(
  kerkeseId: string,
  veprimi: "prano" | "refuzo",
) {
  const profil = await profiliIm();
  if (!profil) return "hyr";
  if (profil.roli !== "shofer") return "ndaluar";
  if (!/^\d{1,18}$/.test(kerkeseId)) return "kerkese";

  const sql = getSql();
  const rows =
    veprimi === "prano"
      ? await sql`SELECT prano_kerkese(${kerkeseId}::bigint, ${profil.id}) AS status`
      : await sql`SELECT refuzo_kerkese(${kerkeseId}::bigint, ${profil.id}) AS status`;
  return String(rows[0]?.status ?? "gabim");
}
