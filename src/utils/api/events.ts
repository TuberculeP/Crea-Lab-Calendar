import { readItems } from "@directus/sdk";
import { apiClient } from "./api_client";
import { formatEvent } from "../events";

export async function getEvents() {
    const events = await apiClient.request(readItems("CalendarEvent", {
        fields: [
            '*',
            {
                assignee: [
                    {
                    directus_users_id: ['*']
                    }
                ]
            }
        ],
    }));
console.log(events);
    return events.map((event: any) => formatEvent(event));
}
