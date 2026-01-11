/* tslint:disable */

/**
 * Mock Service Worker (2.12.7).
 * @see https://github.com/mswjs/msw
 * - Please do NOT modify this file.
 * - Please do NOT serve this file on production.
 */

const INTEGRITY_CHECKSUM = '26357c79639bfa20d64c0efca2a87423';
const IS_MOCKED_RESPONSE = Symbol('isMockedResponse');
const activeClientIds = new Set();

self.addEventListener('install', function () {
  globalThis.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(globalThis.clients.claim());
});

self.addEventListener('message', async function (event) {
  const clientId = event.source.id;

  if (!clientId || !event.data) {
    return;
  }

  const allClients = await globalThis.clients.matchAll({
    type: 'window',
  });

  switch (event.data) {
    case 'KEEPALIVE_REQUEST': {
      sendToClient(event.source, {
        type: 'KEEPALIVE_RESPONSE',
      });

      break;
    }

    case 'INTEGRITY_CHECK_REQUEST': {
      sendToClient(event.source, {
        type: 'INTEGRITY_CHECK_RESPONSE',
        payload: INTEGRITY_CHECKSUM,
      });

      break;
    }

    case 'MOCK_ACTIVATE': {
      activeClientIds.add(clientId);

      sendToClient(event.source, {
        type: 'MOCKING_ENABLED',
        payload: true,
      });

      break;
    }

    case 'MOCK_DEACTIVATE': {
      activeClientIds.delete(clientId);
      break;
    }

    case 'CLIENT_CLOSED': {
      activeClientIds.delete(clientId);

      const remainingClients = allClients.filter((client) => {
        return client.id !== clientId;
      });

      // Unregister itself when there are no more clients
      if (remainingClients.length === 0) {
        globalThis.registration.unregister();
      }

      break;
    }
  }
});

self.addEventListener('fetch', function (event) {
  const { request } = event;

  // Bypass navigation requests.
  if (request.mode === 'navigate') {
    return;
  }

  // Opening the DevTools triggers the "only-if-cached" request
  // that cannot be handled by the worker. Bypass such requests.
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    return;
  }

  // Bypass all requests when there are no active clients.
  // Prevents the self-unregistered worked from handling requests
  // after it's been deleted (still remains active until the next reload).
  if (activeClientIds.size === 0) {
    return;
  }

  // Generate unique request ID.
  const requestId = crypto.randomUUID();

  event.respondWith(handleRequest(event, requestId));
});

async function handleRequest(event, requestId) {
  const client = await event.target.clients.get(event.clientId);

  if (!client) {
    return passthrough(event.request);
  }

  const requestCloneHeaders = serializeHeaders(event.request.headers);
  const requestClone = event.request.clone();

  function passthrough(request) {
    const headers = Object.fromEntries(requestCloneHeaders);

    // Remove internal MSW request header so the passthrough request
    // complies with any potential CORS preflight checks on the server.
    delete headers['x-msw-intention'];

    return fetch(request, { headers });
  }

  sendToClient(
    client,
    {
      type: 'REQUEST',
      payload: {
        id: requestId,
        url: event.request.url,
        method: event.request.method,
        headers: requestCloneHeaders,
        cache: event.request.cache,
        mode: event.request.mode,
        credentials: event.request.credentials,
        destination: event.request.destination,
        integrity: event.request.integrity,
        redirect: event.request.redirect,
        referrer: event.request.referrer,
        referrerPolicy: event.request.referrerPolicy,
        body: await event.request.text(),
        keepalive: event.request.keepalive,
      },
    },
    [requestClone.bodyUsed ? undefined : await requestClone.arrayBuffer()],
  );

  const responsePromise = getResponse(event, client, requestId);

  return responsePromise.then((response) => {
    // Handle mocked "error" and "opaqueredirect" responses.
    // @see https://fetch.spec.whatwg.org/#concept-network-error
    if (response.type === 'error') {
      return Response.error();
    }

    // Handle mocked "opaqueredirect" responses.
    // @see https://fetch.spec.whatwg.org/#concept-response-opaque-redirect
    if (response.type === 'opaqueredirect') {
      return Response.redirect(event.request.url, 301);
    }

    return response;
  });
}

async function getResponse(event, client, requestId) {
  const { request } = event;

  return new Promise((resolve, reject) => {
    function listener(event) {
      if (
        !event.data
        || event.data.type !== 'MOCK_RESPONSE'
        || event.data.payload.id !== requestId
      ) {
        return;
      }

      self.removeEventListener('message', listener);

      if (event.data.payload.type === 'NETWORK_ERROR') {
        reject(new Error(event.data.payload.error));

        return;
      }

      const { status, statusText, headers, body, type } = event.data.payload;

      const response = new Response(
        new Uint8Array(body).buffer,
        {
          status,
          statusText,
          headers: Object.fromEntries(headers),
        },
      );

      Object.defineProperty(response, IS_MOCKED_RESPONSE, {
        value: true,
        enumerable: true,
      });

      Object.defineProperty(response, 'type', {
        value: type || 'default',
        enumerable: true,
      });

      resolve(response);
    }

    self.addEventListener('message', listener);

    // Timeout the response resolution after 5 seconds.
    setTimeout(() => {
      self.removeEventListener('message', listener);
      resolve(passthrough(request));
    }, 5000);
  });
}

function sendToClient(client, message, transferables = []) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();

    channel.port1.onmessage = (event) => {
      if (event.data && event.data.error) {
        return reject(event.data.error);
      }

      resolve(event.data);
    };

    client.postMessage(
      message,
      [channel.port2].concat(transferables.filter(Boolean)),
    );
  });
}

function serializeHeaders(headers) {
  const reqHeaders = [];

  for (const [key, value] of headers.entries()) {
    reqHeaders.push([key, value]);
  }

  return reqHeaders;
}
