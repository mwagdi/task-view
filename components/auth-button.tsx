import Link from 'next/link';
import { FC } from 'react';

import { createClient } from '@/lib/supabase/server';

import { Button } from './ui/button';
import { LogoutButton } from './logout-button';




export const AuthButton: FC = async() => {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  const arr = ['lorem ipsum', 'dolor sit amet', 'lorem ipsum', 'dolor sit amet', 'dolor sit amet', 'dolor sit amet'];


  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={'outline'}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={'default'}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
};
