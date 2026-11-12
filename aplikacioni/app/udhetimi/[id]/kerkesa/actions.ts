"use server";

import { redirect } from "next/navigation";

import { kerkoVend } from "@/lib/kerkesat";

export async function dergoKerkese(formData: FormData) {
  const udhetimId = String(formData.get("udhetimId") ?? "");
  let status: string;

  try {
    status = await kerkoVend(udhetimId);
  } catch {
    status = "databaza";
  }

  redirect(
    `/udhetimi/${encodeURIComponent(udhetimId)}/kerkesa?m=${encodeURIComponent(status)}`,
  );
}
