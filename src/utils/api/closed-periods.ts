import { createItem, readItems } from "@directus/sdk";
import { apiClient } from "./api_client";
import { formatClosedPeriods } from "../closed-periods";

export async function getClosedPeriods() {
    const closedPeriods = await apiClient.request(readItems('calendar_closed_periods'));
    return formatClosedPeriods(closedPeriods);
}

export async function createClosedPeriod(closedPeriod: { start_date: string; end_date: string; }) {
    return await apiClient.request(createItem('calendar_closed_periods', closedPeriod));
}