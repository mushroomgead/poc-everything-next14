import { redirect } from "next/navigation";
import { createClient } from "redis";
import { getKey } from "../services/redisService";

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  const { key } = params;
  const url = await getKey(key);
  return redirect(url);
}
