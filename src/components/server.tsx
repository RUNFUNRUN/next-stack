import 'server-only';
import { getAuth } from '@/lib/auth';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { headers } from 'next/headers';
import { Suspense } from 'react';

const UserInfo = async () => {
  const { env } = await getCloudflareContext();
  const auth = await getAuth(env.DB);
  const session = await auth.api.getSession({ headers: await headers() });
  return session ? (
    <pre className='whitespace-pre-wrap break-all p-4 text-left border-black border rounded-lg'>
      {JSON.stringify(session, null, 2)}
    </pre>
  ) : (
    <p className='text-xl text-center'>No session</p>
  );
};

export const Server = () => {
  return (
    <Suspense fallback={<p className='text-center'>Loading...</p>}>
      <UserInfo />
    </Suspense>
  );
};
