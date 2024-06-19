import { randomBytes } from "crypto";
import { createClient } from "redis";

const client = createClient();

export async function getKey(key: string): Promise<string> {
  await client.connect();
  const url = await client.get(key);

  if (!url) {
    return "/";
  }
  return url;
}

export async function createLinkByKey(
  url: FormDataEntryValue | null
): Promise<{ status: string }> {
  if (!url || typeof url !== "string") {
    throw new Error("Invalid URL");
  }
  try {
    await client.connect();

    const key = randomBytes(5).toString("hex");
    await client.set(key, url);

    return {
      status: "success",
    };
  } catch (error) {
    return {
      status: "error",
    };
  }
}
