import { readItems } from "@directus/sdk";
import { apiClient } from "./api_client";
import { formatEvent } from "../events";

export async function getMachines() {
    const events = await apiClient.request(readItems("CalendarMachines"));

    return events.map((event: any) => formatEvent(event));
}