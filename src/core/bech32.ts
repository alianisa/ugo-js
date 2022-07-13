import { bech32 } from 'bech32';

/** `terra-` prefixed account address */
export type AccAddress = string;

/** `terravaloper-` prefixed validator operator address */
export type ValAddress = string;

/** `terravalcons-` prefixed validator consensus address */
export type ValConsAddress = string;

/** `terrapub-` prefixed account public key */
export type AccPubKey = string;

/** `terravaloperpub-` prefixed validator public key */
export type ValPubKey = string;

function checkPrefixAndLength(
  prefix: string,
  data: string,
  length: number
): boolean {
  try {
    const vals = bech32.decode(data);
    return vals.prefix === prefix && data.length == length;
  } catch (e) {
    return false;
  }
}

export namespace AccAddress {
  /**
   * Checks if a string is a valid Terra account address.
   *
   * @param data string to check
   */
  export function validate(data: string): boolean {
    // 44 for normal account and 64 for contract account
    return (
      checkPrefixAndLength('ugo', data, 42) ||
      checkPrefixAndLength('ugo', data, 62)
    );
  }

  /**
   * Converts a validator address into an account address
   *
   * @param address validator address
   */
  export function fromValAddress(address: ValAddress): AccAddress {
    const vals = bech32.decode(address);
    return bech32.encode('ugo', vals.words);
  }
}

export namespace AccPubKey {
  /**
   * Checks if a string is a Terra account's public key
   * @param data string to check
   */

  export function validate(data: string): boolean {
    return checkPrefixAndLength('ugopub', data, 45);
  }

  /**
   * Converts a Terra validator pubkey to an account pubkey.
   * @param address validator pubkey to convert
   */
  export function fromAccAddress(address: AccAddress): AccPubKey {
    const vals = bech32.decode(address);
    return bech32.encode('ugopub', vals.words);
  }
}

export namespace ValAddress {
  /**
   * Checks if a string is a Terra validator address.
   *
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('ugovaloper', data, 49);
  }

  /**
   * Converts a Terra account address to a validator address.
   * @param address account address to convert
   */
  export function fromAccAddress(address: AccAddress): ValAddress {
    const vals = bech32.decode(address);
    return bech32.encode('ugovaloper', vals.words);
  }
}

export namespace ValPubKey {
  /**
   * Checks if a string is a Terra validator pubkey
   * @param data string to check
   */
  export function validate(data: string): boolean {
    return checkPrefixAndLength('ugovaloperpub', data, 52);
  }

  /**
   * Converts a Terra validator operator address to a validator pubkey.
   * @param valAddress account pubkey
   */
  export function fromValAddress(valAddress: ValAddress): ValPubKey {
    const vals = bech32.decode(valAddress);
    return bech32.encode('ugovaloperpub', vals.words);
  }
}

export namespace ValConsAddress {
  /**
   * Checks if a string is a Terra validator consensus address
   * @param data string to check
   */

  export function validate(data: string): boolean {
    return checkPrefixAndLength('ugovalcons', data, 49);
  }
}
