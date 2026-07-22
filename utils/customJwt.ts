import base45 from "base45";
import { createSignature, verifySignature } from "./signer.js";

export type CustomJwtData = Record<string, unknown>;

const signaturePattern = /^[0-9A-F]{64}$/;

function isObject(value: unknown): value is CustomJwtData {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}


// creation function
export function createCustomJwt<T extends CustomJwtData>(data: T): string {
  const json = JSON.stringify(data);

  if (json === undefined) {
    throw new TypeError("Custom JWT data must be JSON serializable");
  }

  const encodedPayload = base45.encode(Buffer.from(json, "utf8"));
  const signature = createSignature(encodedPayload).toUpperCase();

  return `${encodedPayload}.${signature}`;
}

// verification function
export function verifyCustomJwt<T extends CustomJwtData>(
  token: string,
): T | null {
  try {
    // A Base45 payload may contain dots, so the final dot is the separator.
    const separatorIndex = token.lastIndexOf(".");

    if (separatorIndex <= 0 || separatorIndex === token.length - 1) {
      return null;
    }

    const encodedPayload = token.slice(0, separatorIndex);
    const signature = token.slice(separatorIndex + 1);

    if (
      !signaturePattern.test(signature) ||
      !verifySignature(signature, encodedPayload)
    ) {
      return null;
    }

    const json = base45.decode(encodedPayload).toString("utf8");
    const data: unknown = JSON.parse(json);

    if (!isObject(data)) {
      return null;
    }

    return data as T;
  } catch {
    return null;
  }
}
