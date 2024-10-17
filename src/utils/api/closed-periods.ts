import { readItems } from "@directus/sdk";
import { apiClient } from "./api_client";
import { formatClosedPeriod } from "../closed-periods";

export async function getClosedPeriods() {
    const closedPeriods = await apiClient.request(readItems('calendar_closed_periods'));
    return closedPeriods.map((closedPeriod: any) => formatClosedPeriod(closedPeriod));
}