import axios from 'axios';
import * as datefns from 'date-fns';

const gcal = axios.create({
  baseURL: 'https://www.googleapis.com/calendar/v3',
  params: { apiKey: window.apiKey },
  headers: {
    Authorization: `${window.token.token_type} ${window.token.access_token}`,
  },
  transformResponse: axios.defaults.transformResponse,
});

function patching(obj) {
  if (obj === undefined) {
    return null;
  }
  return obj;
}

export async function getColors() {
  const { error, data: { event } } = await gcal.get('/colors', {
    params: {
      fields: 'event',
    },
  });
  if (error) throw error;
  return event;
}

export async function listEvents({ start, end }) {
  const { error, data: { items } } = await gcal.get('/calendars/primary/events', {
    params: {
      singleEvents: true,
      timeMin: datefns.format(start, 'yyyy-MM-dd\'T\'HH:mm:ssXXX'),
      timeMax: datefns.format(end, 'yyyy-MM-dd\'T\'HH:mm:ssXXX'),
      fields: 'items(id,colorId,description,end,htmlLink,id,location,start,summary)',
    },
  });
  if (error) throw error;
  for (const item of items) {
    item.eId = item.id;
    delete item.id;
    item.start = datefns.parseISO(item.start.dateTime);
    item.end = datefns.parseISO(item.end.dateTime);
  }
  return items;
}

export async function insertEvent({ start, end, summary, description, colorId, location }) {
  const { error, data } = await gcal.post('/calendars/primary/events', {
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
  if (error) throw error;
  return data;
}

export async function updateEvent({ eId, start, end, summary, description, colorId, location }) {
  const { error, data } = await gcal.patch(`/calendars/primary/events/${eId}`, {
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
  if (error) throw error;
  return data;
}

export async function deleteEvent({ eId }) {
  await gcal.delete(`/calendars/primary/events/${eId}`);
}
