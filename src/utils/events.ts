function formatTimestamp(timestamp: string) {
  const date = timestamp?.split("T")[0];
  const time = timestamp?.split("T")[1].split(".")[0];

  return `${date} ${time}`;
}

export function formatEvent(event: any) {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    start: formatTimestamp(event.start_date),
    end: formatTimestamp(event.end_date),
    assignee: event.assignee ? event.assignee : [],
    split: event.machine_id ? event.machine_id : -1,
    isMachineSlot: event.machine_id ? true : false,
  };
}

export const formatMachinesForCalendar = (machines: any) => {
  return [
    {
      id: -1,
      class: "room",
      label: "Crealab",
    },
    ...machines.map((machine: any) => ({
      id: machine.id,
      class: machine.name.toLowerCase().replace(" ", "-"),
      label: machine.name,
    })),
  ];
};

export function generateEventColor(eventName: string) {
  let hash = 0;
  for (let i = 0; i < eventName.length; i++) {
    hash = eventName.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }

  return { backgroundColor: color, borderColor: color, color: "white" };
}
