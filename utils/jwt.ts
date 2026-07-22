import jwt, { type JwtPayload } from "jsonwebtoken";
import { envConfigs } from "../configs/envConfigs.js";

export type JwtObject = Record<string, unknown>;

export interface SignedJwtPayload<T extends JwtObject> extends JwtPayload {
  data: T;
}

function isObject(value: unknown): value is JwtObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Creates an HS256 JWT without an expiry date.
export function createJwtToken<T extends JwtObject>(data: T): string {
  return jwt.sign({ data }, envConfigs.SIGN_SECRET, {
    algorithm: "HS256",
    noTimestamp: true,
  });
}

//verify the jwt data
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

    if (!isObject(payload) || !isObject(payload.data)) {
      return null;
    }

    return payload as SignedJwtPayload<T>;
  } catch {
    return null;
  }
}

// Returns only the original object when the JWT is valid.
export function verifyJwtData<T extends JwtObject>(token: string): T | null {
  return verifyJwtToken<T>(token)?.data ?? null;
}

/* const data = {
  name: "karn",
  age: 100,
};

const base64data = createJwtToken(data);
console.log("jwt data", base64data);

const verifiedPayload = verifyJwtData(base64data);
console.log("verified data", verifiedPayload);
 */
