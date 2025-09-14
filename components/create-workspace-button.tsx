'use client';
import { FC, useTransition } from 'react';

import { createClient } from '@/lib/supabase/client';

const CreateWorkspaceButton: FC = () => {
  const [pending, start] = useTransition();

  const supabase = createClient();

  const createWorkspace = async (): Promise<void> => {
    const res = await supabase
      .from('workspaces')
      .insert({ name: 'Example Workspace' })
      .select('*')
      .single();
    console.log({ res });
  };

  return (
    <button onClick={() => start(() => createWorkspace())}>
      {pending ? 'Creating…' : 'Test workspace create'}
    </button>
  );
};

export default CreateWorkspaceButton;
