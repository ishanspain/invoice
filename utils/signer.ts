import { createHmac, timingSafeEqual } from "node:crypto";
import { envConfigs } from "../configs/envConfigs.js";

export function createSignature(data: string): string {
  return createHmac("sha256", envConfigs.SIGN_SECRET)
    .update(data)
    .digest("hex");
}

export function verifySignature(signature: string, data: string): boolean {
  const expected = Buffer.from(createSignature(data), "hex");
  const actual = Buffer.from(signature, "hex");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
