"use client";

import { signIn, signOut } from "next-auth/react";

type HyrjaProps = {
  brenda: boolean;
  oauthConfigured: boolean;
};

export default function Hyrja({ brenda, oauthConfigured }: HyrjaProps) {
  if (!oauthConfigured) {
    return (
      <p role="status">
        Për hyrje, konfiguro GITHUB_ID, GITHUB_SECRET dhe NEXTAUTH_SECRET në
        skedarin lokal .env.local.
      </p>
    );
  }

  return brenda ? (
    <button type="button" onClick={() => signOut({ callbackUrl: "/panel" })}>
      Dil
    </button>
  ) : (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl: "/panel" })}
    >
      Hyr me GitHub
    </button>
  );
}
