import React from 'react'
import { supabase } from '../../../lib/supabaseClient';

export default async function Admin() {
  const res = await supabase.auth.getUser();
  const user = res.data.user;

  console.log("this is the user:"+user);

  return (
    <div className='w-screen h-screen'>
      Admin
    </div>
  )
}
