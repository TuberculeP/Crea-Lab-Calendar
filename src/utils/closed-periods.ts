export const formatClosedPeriod = (closedPeriod: any) => {
    console.log("closedPeriod", closedPeriod);
    return {
        id: closedPeriod.id,
        title: "Closed",
        start: formatTimestamp(closedPeriod.start_date),
        end: formatTimestamp(closedPeriod.end_date),
    };
}

function formatTimestamp(timestamp: string) {
    const date = timestamp.split('T')[0];
    const time = timestamp.split('T')[1].split('.')[0];

    return `${date} ${time}`;
}