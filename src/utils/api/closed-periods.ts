import { createItem, readItems, deleteItem } from "@directus/sdk";
import { apiClient } from "./api_client";
import { formatClosedPeriods } from "../closed-periods";

export async function getClosedPeriods() {
    const closedPeriods = await apiClient.request(readItems('calendar_closed_periods'));
    return closedPeriods;
}

export async function getFormatedClosedPeriods() {
    const closedPeriods = await apiClient.request(readItems('calendar_closed_periods'));
    return formatClosedPeriods(closedPeriods);
}

export async function createClosedPeriod(closedPeriod: { start_date: string; end_date: string; }) {
    return await apiClient.request(createItem('calendar_closed_periods', closedPeriod));
}

export async function deleteClosedPeriod(id: number) {
    return await apiClient.request(deleteItem('calendar_closed_periods', id));
}