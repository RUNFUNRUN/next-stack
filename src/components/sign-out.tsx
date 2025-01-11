'use client';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export const SignOut = () => {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await signOut();
        router.refresh();
      }}
    >
      SignOut
    </Button>
  );
};
