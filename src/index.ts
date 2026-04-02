export interface Env {
  AI: Ai;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const inputs: {
      prompt: string;
      guidance?: number;
      seed?: number;
      height?: number;
      width?: number;
      num_steps?: number;
      negative_prompt?: string;
    } = {
      prompt: "cyberpunk cat",
    };

    if (request.method === "POST") {
      try {
        const body = await request.json<typeof inputs>();
        if (body.prompt) inputs.prompt = body.prompt;
        if (body.guidance !== undefined) inputs.guidance = body.guidance;
        if (body.seed !== undefined) inputs.seed = body.seed;
        if (body.height !== undefined) inputs.height = body.height;
        if (body.width !== undefined) inputs.width = body.width;
        if (body.num_steps !== undefined) inputs.num_steps = body.num_steps;
        if (body.negative_prompt !== undefined) inputs.negative_prompt = body.negative_prompt;
      } catch {
        // Use default prompt if body parsing fails
      }
    }

    const response = await env.AI.run("@cf/leonardo/phoenix-1.0", inputs);

    return new Response(response, {
      headers: {
        "content-type": "image/jpg",
      },
    });
  },
} satisfies ExportedHandler<Env>;
