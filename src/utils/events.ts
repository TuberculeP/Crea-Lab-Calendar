
// Format object 

export const formatEvent = (event: any) => {
    // TODO check with backend if the event object is correct
    return {
        id: event.id,
        title: event.title,
        description : event.description,
        start: event.start_date,
        end: event.end_date,
        assignees : event.assignees ? event.assignees : [],
        split : event.machine_id ? event.machine_id : 1,
        isMachineSlot : event.machine_id ? true : false,
    };
}

export const formatMachinesForCalendar = (machines: any) => {
    console.log(machines);
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

export async function getEvents() {
    const events = [
        {
            id: 1,
            title: "Meeting",
            description: "Meeting with the team",
            start_date: '2024-10-16 08:20',
            end_date: '2024-10-16 09:00',
            machine_id: undefined,
            assignees : [{
              id: 1,
              first_name: "John",
              last_name: "Doe",
              email: "johndoe@mail.com"
            }],        
          },
          {
            id: 1,
            title: "Impression figurine",
            description: "Impression de la figurine",
            start_date: '2024-10-16 08:20',
            end_date: '2024-10-16 09:00',
            machine_id: 2,
            assignees : [],
          },
          {
            id: 2,
            title: "Impression figurine",
            description: "Impression de la figurine",
            start_date: '2024-10-16 09:00',
            end_date: '2024-10-16 10:00',
            machine_id: 2,
            assignees : [{
              id: 1,
              first_name: "John",
              last_name: "Doe",
              email: "johndoe@gmail.com"
            },
            {
              id: 2,
              first_name: "Jane",
              last_name: "Doe",
              email: "janedoe@mail.com"
            }],
          },
          {
            id: 3,
            title: "Impression figurine",
            description: "Impression de la figurine",
            start_date: '2024-10-16 10:00',
            end_date: '2024-10-16 11:00',
            machine_id: 2,
          },
          {
            id: 4,
            title: "Impression figurine",
            description: "Impression de la figurine",
            start_date: '2024-10-16 11:00',
            end_date: '2024-10-16 12:00',
            machine_id:3,
          },
          {
            id: 5,
            title: "Impression figurine",
            description: "Impression de la figurine",
            start_date: '2024-10-16 12:00',
            end_date: '2024-10-16 13:00',
            machine_id: 2,
          }
        ];

    return events.map((event) => formatEvent(event));
}
