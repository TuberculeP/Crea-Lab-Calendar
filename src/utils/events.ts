
function formatTimestamp(timestamp: string) {
    const date = timestamp?.split('T')[0];
    const time = timestamp?.split('T')[1].split('.')[0];

    return `${date} ${time}`;
}

export function formatEvent(event: any) {
    return {
        id: event.id,
        title: event.title,
        description : event.description,
        start: formatTimestamp(event.start_date),
        end: formatTimestamp(event.end_date),
        assignee : event.assignee ? event.assignee : [],
        split : event.machine_id ? event.machine_id : 1,
        isMachineSlot : event.machine_id ? true : false,
    };
}
export const formatMachinesForCalendar = (machines: any) => {
    return machines.map((machine: any) => {
        return {
            id: machine.id,
            label: machine.name,
            class: machine.name,
        };
    });
}




// TODO : to remove / fake calls to populate the calendar 

export async function getMachines() {
    const machines = [
        {
            id: 1,
            name: 'Salle',
        },
        {
            id: 2,
            name: 'Imprimante 3d',
        },
        {
            id: 3,
            name: 'Machine a coudre',
        }
    ];

    return formatMachinesForCalendar(machines);
}

