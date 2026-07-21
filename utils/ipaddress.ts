import { internalIpV4 } from "internal-ip";

const LOOPBACK_IP = "127.0.0.1";

/**
 * The IPv4 address other devices on the same LAN can use to reach this host.
 * Falls back to loopback when no active network interface can be detected.
 */
export async function getLanIpAddress(): Promise<string> {
  return (await internalIpV4()) ?? LOOPBACK_IP;
}

const lanIpAddress = await getLanIpAddress();

export default lanIpAddress;
