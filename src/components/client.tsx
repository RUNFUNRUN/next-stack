'use client';

import type { AppType } from '@/app/api/[[...hono]]/route';
import { useSession } from '@/lib/auth-client';
import { hc } from 'hono/client';
import { useEffect, useState } from 'react';

const client = hc<AppType>('/');

export const Client = () => {
  const { data: session, isPending, error: _error } = useSession();
  const [honoMessage, setHonoMessage] = useState('Loading...');

  useEffect(() => {
    (async () => {
      const res = await client.api.hello.$get();
      if (res.status === 200) {
        setHonoMessage((await res.json()).message);
      }
    })();
  }, []);

  if (isPending) return <p className='text-center'>Loading...</p>;

  return session ? (
    <div className='space-y-2'>
      <pre className='whitespace-pre-wrap break-all p-4 text-left border-black border rounded-lg'>
        {JSON.stringify(session, null, 2)}
      </pre>
      <div>
        <p className='text-xl'>
          Hono API Response:
          <code className='bg-slate-100 rounded-sm mx-1 p-1'>
            {honoMessage}
          </code>
        </p>
      </div>
    </div>
  ) : (
    <p className='text-xl text-center'>No session</p>
  );
};
