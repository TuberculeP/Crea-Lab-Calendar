interface ClosedPeriod {
    start_date: string;
    end_date: string;
}

export function formatClosedPeriods(closedPeriods: ClosedPeriod[]) {
    const dates: Date[] = [];
    closedPeriods.forEach((period: any) => {
        const start = new Date(period.start_date);
        const end = new Date(period.end_date);
        end.setDate(end.getDate() + 1);
        for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
            dates.push(new Date(date).format());
        }
    });
    return dates;
}