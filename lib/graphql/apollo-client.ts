import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { registerApolloClient } from '@apollo/client-integration-nextjs';
import { headers } from 'next/headers';

const makeBaseUrl = async (): Promise<string> => {
  // On the server, construct an absolute URL from incoming request headers
  if (typeof window === 'undefined') {
    const h = await headers();
    const proto = h.get('x-forwarded-proto') ?? 'http';
    const host = h.get('x-forwarded-host') ?? h.get('host');
    if (!host) throw new Error('Host header is missing');
    return `${proto}://${host}`;
  }
  // In the browser, relative is fine
  return '';
};

export const { getClient } = registerApolloClient(async () => {
  const baseUrl = await makeBaseUrl();
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${baseUrl}/api/graphql`,
      // credentials: 'include',
      // fetchOptions: { cache: 'no-store' }, // optional if you want no caching on server fetches
    }),
  });
});
