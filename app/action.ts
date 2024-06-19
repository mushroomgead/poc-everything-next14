"use server";
import { randomBytes } from "crypto";
import { createClient } from "redis";
import { createLinkByKey } from "./services/redisService";

export async function shorten(
  currentState: { status: string },
  formData: FormData
) {
  const url = formData.get("url");
  const response = await createLinkByKey(url);
  return response;
  // if (!url || typeof url !== "string") {
  //   throw new Error("Invalid URL");
  // }
  // const client = createClient();
  // await client.connect();

  // const key = randomBytes(5).toString("hex");
  // await client.set(key, url);
  // return { status: `localhost:3001/${key}` };
}
