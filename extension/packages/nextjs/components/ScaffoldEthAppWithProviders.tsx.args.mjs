export const providerImports = `{
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { SessionProvider } from "next-auth/react";
}`;

export const providerOpeningTags = `{
  <SessionProvider>
    <RainbowKitSiweNextAuthProvider>
}`;

export const providerClosingTags = `{
     </SessionProvider>
  </RainbowKitSiweNextAuthProvider>
  }`;