import { NextResponse } from "next/server";

import { getSql } from "@/lib/db";

export async function GET() {
  try {
    const sql = getSql();
    const rows = await sql`SELECT 1 AS ok, NOW() AS current_time`;
    const row = Array.isArray(rows) ? (rows[0] as { current_time?: string | Date } | undefined) : undefined;

    return NextResponse.json({
      ok: true,
      message: "Database connection successful.",
      currentTime: row?.current_time ? new Date(row.current_time).toISOString() : null,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Database connection failed. Check DATABASE_URL and the Neon database status.",
      },
      { status: 500 },
    );
  }
}
