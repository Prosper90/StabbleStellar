import type { ModuleInterface } from "@creit.tech/stellar-wallets-kit";

declare module "@creit.tech/stellar-wallets-kit/modules/freighter" {
  export const FREIGHTER_ID: string;
  export class FreighterModule implements ModuleInterface {
    constructor();
  }
}

declare module "@creit.tech/stellar-wallets-kit/modules/lobstr" {
  export const LOBSTR_ID: string;
  export class LobstrModule implements ModuleInterface {
    constructor();
  }
}

declare module "@creit.tech/stellar-wallets-kit/modules/xbull" {
  export const XBULL_ID: string;
  export class xBullModule implements ModuleInterface {
    constructor();
  }
}
