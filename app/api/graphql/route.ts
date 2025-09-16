import { readFileSync } from 'node:fs';
import { join } from 'path';

import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { ApolloServer } from '@apollo/server';

export const runtime = 'nodejs'; // Apollo Server requires the Node.js runtime (not Edge)

const typeDefs = readFileSync(join(process.cwd(), 'lib/graphql/schema.graphql'), 'utf8');
const resolvers = {
  Query: {
    hello: (): string => '👋 from Apollo Server on Next.js',
  },
};

type Context = { userId?: string };

const server = new ApolloServer<Context>({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (req) => {
    // example auth passthrough; adapt to your setup (e.g., Supabase JWT)
    const auth = req.headers.get('authorization') || '';
    const userId = auth.startsWith('Bearer ') ? 'some-user-id' : undefined;
    return { userId };
  },
});

// ⬇️ Wrap to strip the (req,res) overload so it matches (request, { params })
export const GET = async (request: NextRequest): Promise<Response> => {
  return handler(request);
};

export const POST = async (request: NextRequest): Promise<Response> => {
  return handler(request);
};
