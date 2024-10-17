import { apiClient } from "./api_client";
import { formatEvent } from "../events";
import { readItems } from "@directus/sdk";

export async function getMachines() {
  const testToken = await apiClient.getToken();
  console.log("testToken", testToken);
  const events = await apiClient.request(readItems("calendar_machines"));

  return events.map((event: any) => formatEvent(event));
}
