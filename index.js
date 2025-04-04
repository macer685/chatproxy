export default {
  async fetch(request) {
    const urlDestino = 'https://macercreative.app.n8n.cloud/webhook/recuperar-chats';

    if (request.method === 'OPTIONS') {
      // Respuesta para preflight (CORS)
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    const response = await fetch(urlDestino, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : null,
    });

    const responseBody = await response.text();

    return new Response(responseBody, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'text/plain',
        'Access-Control-Allow-Origin': '*',
      },
    });
  },
};
