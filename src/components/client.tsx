'use client';

import type { AppType } from '@/app/api/[[...hono]]/route';
import { useSession } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';
import { hc } from 'hono/client';

const client = hc<AppType>('/');

export const Client = () => {
  const { data: session, isPending, error } = useSession();

  const { data: honoMessage, status } = useQuery({
    queryKey: ['hono'],
    queryFn: async () => {
      const res = await client.api.hello.$get();
      return (await res.json()).message;
    },
    enabled: !!session,
  });

  if (isPending) return <p className='text-center'>Loading...</p>;

  if (error) return <p className='text-center'>An error occurred.</p>;

  return session ? (
    <div className='space-y-2'>
      <pre className='whitespace-pre-wrap break-all p-4 text-left border-black border rounded-lg'>
        {JSON.stringify(session, null, 2)}
      </pre>
      <div>
        <p className='text-xl'>
          Hono API Response:
          {status === 'success' ? (
            <code className='bg-slate-100 rounded-sm mx-1 p-1'>
              {honoMessage}
            </code>
          ) : status === 'pending' ? (
            <span>Loading...</span>
          ) : (
            status === 'error' && <span>An error occurred.</span>
          )}
        </p>
      </div>
    </div>
  ) : (
    <p className='text-xl text-center'>No session</p>
  );
};
