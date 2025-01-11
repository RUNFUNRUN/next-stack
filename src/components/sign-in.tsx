'use client';

import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth-client';
import { usePathname, useRouter } from 'next/navigation';

export const SignIn = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await signIn.social({
          provider: 'discord',
          callbackURL: pathname,
        });
        router.refresh();
      }}
    >
      SignIn with Discord
    </Button>
  );
};
