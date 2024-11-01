import {collectDefaultMetrics, register} from 'prom-client';

collectDefaultMetrics();
export async function GET() {
  return new Response(await register.metrics());
}
