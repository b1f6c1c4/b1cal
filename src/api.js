import axios from 'axios';
import * as datefns from 'date-fns';

const gcal = axios.create({
  baseURL: 'https://www.googleapis.com/calendar/v3',
  params: { apiKey: window.apiKey },
});

function patching(obj) {
  if (obj === undefined) {
    return null;
  }
  return obj;
}

export async function getColors() {
  const { data: { event } } = await gcal.get('/colors', {
    params: {
      fields: 'event',
    },
  });
  return event;
}

export async function listEvents({ start, end }) {
  const { data: { items } } = await gcal.get('/calendars/primary/events', {
    params: {
      singleEvents: true,
      timeMin: datefns.format(start, 'yyyy-MM-dd\'T\'HH:mm:ssXXX'),
      timeMax: datefns.format(end, 'yyyy-MM-dd\'T\'HH:mm:ssXXX'),
      fields: 'items(id,colorId,description,end,htmlLink,id,location,start,summary)',
    },
  });
  return items;
}

export async function insertEvent({ start, end, summary, description, colorId, location }) {
  const { data } = await gcal.post('/calendars/primary/events', {
    params: {
      fields: 'items(id,colorId,description,end,htmlLink,id,location,start,summary)',
    },
    data: {
      start: datefns.format(start, 'yyyy-MM-dd\'T\'HH:mm:ssXXX'),
      end: datefns.format(end, 'yyyy-MM-dd\'T\'HH:mm:ssXXX'),
      summary,
      description,
      colorId,
      location,
    },
  });
  return data;
}

export async function updateEvent({ eId, start, end, summary, description, colorId, location }) {
  const { data } = await gcal.patch(`/calendars/primary/events/${eId}`, {
    params: {
      fields: 'items(id,colorId,description,end,htmlLink,id,location,start,summary)',
    },
    data: {
      start: datefns.format(start, 'yyyy-MM-dd\'T\'HH:mm:ssXXX'),
      end: datefns.format(end, 'yyyy-MM-dd\'T\'HH:mm:ssXXX'),
      summary: patching(summary),
      description: patching(description),
      colorId: patching(colorId),
      location: patching(location),
    },
  });
  return data;
}

export async function deleteEvent({ eId }) {
  await gcal.delete(`/calendars/primary/events/${eId}`);
}
