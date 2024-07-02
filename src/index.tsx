
// Define the structure for the environment variables, specifically the AI model interface
export interface Env {
  AI: Ai;
}


// Default export of an object containing the fetch method
export default {
  // Asynchronous fetch method to handle requests
   async fetch(request, env): Promise<Response> {
    try {
      // Parse the JSON body from the request
      const requestData = await request.json() as { input: string; model: string };

      // Run the AI model with the messages and store the result
      const embeddings = await env.AI.run('@cf/baai/bge-small-en-v1.5', {
        text: requestData.input,
      });

      const response = {
        "object": "list",
        "data": [
          {
            "object": "embedding",
            "index": 0,
            "embedding": embeddings.data,
          }
        ],
        "model": "text-embedding-3-small",
        "usage": {
          "prompt_tokens": 0,
          "total_tokens": 0
        }
      };

      // Return a new HTTP response with the choices object as a JSON string
      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      // Handle unexpected errors
      return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}
