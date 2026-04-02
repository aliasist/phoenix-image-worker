export interface Env {
  AI: Ai;
}

interface PhoenixInput {
  prompt: string;
  guidance?: number;
  seed?: number;
  height?: number;
  width?: number;
  num_steps?: number;
  negative_prompt?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    let body: PhoenixInput;
    try {
      body = await request.json<PhoenixInput>();
    } catch {
      return new Response("Invalid JSON body", { status: 400 });
    }

    if (!body.prompt || typeof body.prompt !== "string") {
      return new Response("Missing required field: prompt", { status: 400 });
    }

    const inputs: PhoenixInput = {
      prompt: body.prompt,
      ...(body.guidance !== undefined && { guidance: body.guidance }),
      ...(body.seed !== undefined && { seed: body.seed }),
      ...(body.height !== undefined && { height: body.height }),
      ...(body.width !== undefined && { width: body.width }),
      ...(body.num_steps !== undefined && { num_steps: body.num_steps }),
      ...(body.negative_prompt !== undefined && { negative_prompt: body.negative_prompt }),
    };

    const response = await env.AI.run("@cf/leonardo/phoenix-1.0", inputs);

    return new Response(response, {
      headers: {
        "content-type": "image/jpeg",
      },
    });
  },
} satisfies ExportedHandler<Env>;
