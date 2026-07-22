import jwt, { type JwtPayload } from "jsonwebtoken";
import { envConfigs } from "../configs/envConfigs.js";
import { createSignature, verifySignature } from "./signer.js";

export type JwtObject = Record<string, unknown>;

export interface SignedJwtPayload<T extends JwtObject> extends JwtPayload {
  data: T;
  signHash: string;
}

function serialize(data: JwtObject): string {
  const serialized = JSON.stringify(data);

  if (serialized === undefined) {
    throw new TypeError("JWT data must be JSON serializable");
  }

  return serialized;
}

function isObject(value: unknown): value is JwtObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Creates an HS256 JWT without an expiry date. */
export function createJwtToken<T extends JwtObject>(data: T): string {
  const payload = {
    data,
    signHash: createSignature(serialize(data)),
  };

  return jwt.sign(payload, envConfigs.SIGN_SECRET, {
    algorithm: "HS256",
  });
}

/**
 * Verifies the JWT and its embedded data hash.
 * Returns the complete payload when valid, otherwise null.
 */
export function verifyJwtToken<T extends JwtObject>(
  token: string,
): SignedJwtPayload<T> | null {
  try {
    const payload: string | JwtPayload = jwt.verify(
      token,
      envConfigs.SIGN_SECRET,
      {
        algorithms: ["HS256"],
      },
    );

    if (
      !isObject(payload) ||
      !isObject(payload.data) ||
      typeof payload.signHash !== "string" ||
      !verifySignature(payload.signHash, serialize(payload.data))
    ) {
      return null;
    }

    return payload as SignedJwtPayload<T>;
  } catch {
    return null;
  }
}

/** Returns only the original object when the JWT is valid. */
export function verifyJwtData<T extends JwtObject>(token: string): T | null {
  return verifyJwtToken<T>(token)?.data ?? null;
}
