import { apiClient } from "./api_client";
import { formatMachinesForCalendar } from "../events";
import { readItems } from "@directus/sdk";

export async function getMachines() {
  const machines = await apiClient.request(readItems("calendar_machines"));
  return formatMachinesForCalendar(machines);
}
