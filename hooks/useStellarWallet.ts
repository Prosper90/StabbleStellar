"use client";

import { useState, useCallback } from "react";

export function useStellarWallet() {
  const [address, setAddress] = useState<string | null>(null);

  const connect = useCallback(async () => {
    // All imports are dynamic — this code never runs during SSR/static-export pre-render
    const [
      { StellarWalletsKit, Networks },
      { FreighterModule, FREIGHTER_ID },
      { LobstrModule },
      { xBullModule },
    ] = await Promise.all([
      import("@creit.tech/stellar-wallets-kit"),
      import("@creit.tech/stellar-wallets-kit/modules/freighter"),
      import("@creit.tech/stellar-wallets-kit/modules/lobstr"),
      import("@creit.tech/stellar-wallets-kit/modules/xbull"),
    ]);

    StellarWalletsKit.init({
      network: Networks.TESTNET,
      selectedWalletId: FREIGHTER_ID,
      modules: [new FreighterModule(), new LobstrModule(), new xBullModule()],
    });

    const result = await StellarWalletsKit.authModal();
    if (result?.address) {
      setAddress(result.address);
    }
  }, []);

  const disconnect = useCallback(async () => {
    const { StellarWalletsKit } = await import("@creit.tech/stellar-wallets-kit");
    await StellarWalletsKit.disconnect();
    setAddress(null);
  }, []);

  return { address, connect, disconnect };
}
