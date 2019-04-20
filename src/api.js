import axios from 'axios';
import * as datefns from 'date-fns';

function retrieve(name) {
  let match = window.location.href.match(new RegExp(`${name}=([^&]*)`));
  if (match) {
    return decodeURIComponent(match[1]);
  }
  match = document.cookie.match(new RegExp(`${name}=([^;]*)`));
  if (match) {
    return decodeURIComponent(match[1]);
  }
  return undefined;
}

let apiKey = retrieve('api_key');
let token = retrieve('token');

if (!(apiKey && token)) {
  window.location = '/';
} else {
  token = JSON.parse(token);
}

function patching(obj) {
  if (obj === undefined) {
    return null;
  }
  return obj;
}

async function refresh() {
  await axios.get('/.netlify/functions/refresh');
  apiKey = retrieve('api_key');
  token = JSON.parse(retrieve('token'));
}

function retryWithRefresh({ descriptor }) {
  const { value } = descriptor;
  // eslint-disable-next-line func-names
  descriptor.value = async function (...args) {
    let result;
    try {
      result = await value.apply(this, args);
      return result;
    } catch (e) {
      if (!(e.code === 401 && e.message === 'Invalid Credentials')) {
        throw e;
      }
    }
    await refresh();
    this.makeApi();
    try {
      result = await value.apply(this, args);
      return result;
    } catch (e) {
      if (!(e.code === 401 && e.message === 'Invalid Credentials')) {
        throw e;
      }
      window.location = '/';
    }
    return undefined;
  };
}

export default class GoogleCalendar {
  constructor() {
    this.makeApi();
  }

  makeApi() {
    this.gcal = axios.create({
      baseURL: 'https://www.googleapis.com/calendar/v3',
      params: { apiKey },
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
      },
      validateStatus: null,
      transformResponse: axios.defaults.transformResponse,
    });
  }

  @retryWithRefresh
  async getColors() {
    const { data: { error, event } } = await this.gcal.get('/colors', {
      params: {
        fields: 'event',
      },
    });
    if (error) throw error;
    return event;
  }

  @retryWithRefresh
  async listEvents({ start, end }) {
    const { data: { error, items } } = await this.gcal.get('/calendars/primary/events', {
      params: {
        singleEvents: true,
        timeMin: datefns.format(start, 'yyyy-MM-dd\'T\'HH:mm:ssXXX'),
        timeMax: datefns.format(end, 'yyyy-MM-dd\'T\'HH:mm:ssXXX'),
        fields: 'items(id,colorId,description,end,htmlLink,id,location,start,summary)',
      },
    });
    if (error) throw error;
    for (const item of items) {
      item.start = datefns.parseISO(item.start.dateTime);
      item.end = datefns.parseISO(item.end.dateTime);
    }
    return items;
  }

  @retryWithRefresh
  async insertEvent({ start, end, summary, description, colorId, location }) {
    const { data } = await this.gcal.post('/calendars/primary/events', {
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
    if (data.error) throw data.error;
    return data;
  }

  @retryWithRefresh
  async updateEvent({ id, start, end, summary, description, colorId, location }) {
    const { data } = await this.gcal.patch(`/calendars/primary/events/${id}`, {
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
    if (data.error) throw data.error;
    return data;
  }

  @retryWithRefresh
  async deleteEvent({ id }) {
    await this.gcal.delete(`/calendars/primary/events/${id}`);
  }
}
