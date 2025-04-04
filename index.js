export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url"); // Obtiene la URL de destino desde la query param

    if (!targetUrl) {
      return new Response("Falta la URL de destino", { status: 400 });
    }

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: {
        ...request.headers,
        "Origin": "*",
      },
      body: request.method !== "GET" ? request.body : null,
    });

    // Reenvía la respuesta con los headers CORS permitidos
    const modifiedHeaders = new Headers(response.headers);
    modifiedHeaders.set("Access-Control-Allow-Origin", "https://macercreative.app.n8n.cloud/webhook/recuperar-chats");
    modifiedHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    modifiedHeaders.set("Access-Control-Allow-Headers", "Content-Type");

    return new Response(response.body, {
      status: response.status,
      headers: modifiedHeaders,
    });
  },
};

