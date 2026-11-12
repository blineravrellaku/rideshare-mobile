"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { pergjigjuKerkeses } from "@/lib/kerkesat";

export async function trajtoKerkese(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const veprimi = formData.get("veprimi");
  let status: string;

  if (veprimi !== "prano" && veprimi !== "refuzo") {
    status = "ndaluar";
  } else {
    try {
      status = await pergjigjuKerkeses(id, veprimi);
    } catch {
      status = "databaza";
    }
  }

  if (status === "pranuar" || status === "refuzuar") {
    revalidatePath("/");
    revalidatePath("/panel/kerkesat");
  }
  redirect(`/panel/kerkesat?m=${encodeURIComponent(status)}`);
}
