import { Client } from '@/components/client';
import { Server } from '@/components/server';
import { SignIn } from '@/components/sign-in';
import { SignOut } from '@/components/sign-out';
import { getAuth } from '@/lib/auth';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { headers } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const Home = async () => {
  const { env } = getCloudflareContext();
  const auth = getAuth(env.DB);
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <main className='container mx-auto my-10'>
      <header className='text-center space-y-2 mb-4'>
        <h1 className='text-2xl font-bold'>Next Stack</h1>
        <p className='text-xl'>
          Next.js + OpenNext + Cloudflare Workers + Hono + Drizzle + D1 + Better
          Auth
        </p>
        <p className='text-lg'>
          <Link
            href='https://github.com/RUNFUNRUN/next-stack'
            className='underline'
          >
            https://github.com/RUNFUNRUN/next-stack
          </Link>
        </p>
        <div>{session ? <SignOut /> : <SignIn />}</div>
      </header>
      <div className='grid sm:grid-cols-2 gap-2'>
        <div className='grid-rows-1'>
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-center'>Client Component</h2>
            <Client />
          </div>
        </div>
        <div className='grid-rows-1'>
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-center'>Server Component</h2>
            <Server />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
