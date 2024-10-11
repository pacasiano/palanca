'use client'

import React from 'react'
import { Cedarville_Cursive } from 'next/font/google';
const cedarville = Cedarville_Cursive({ weight: '400', subsets: ['latin'] });
import { supabase } from '../../../../lib/supabaseClient';
import toast from 'react-hot-toast';

function SignUp() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSignUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            setError(error.message);
            toast.error(error.message);
        }
        else {
            toast.success('Check your email for confirmation!');
        }
        setIsSubmitting(false);
    };

    const createAdmin = async () => {
        const { error } = await supabase.auth.signUp({
            email: 'peterandre.casiano@icloud.com',
            password: '10222002',
        });
        
        if (error) {
        console.error('Error signing up:', error.message);
        } else {
        console.log('User signed up successfully!');
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-96 flex flex-col justify-center items-center gap-8'>
                <h1 className={` ${cedarville.className} text-5xl`}>Admin Signup</h1>
                <form onSubmit={handleSignUp} className='flex flex-col justify-center items-end gap-5'>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className='pl-2 h-10 rounded-md w-96 text-black outline-none'
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className='pl-2 h-10 rounded-md w-96 text-black outline-none'
                    />
                    <button
                        className={`bg-blue-500 cursor-pointer hover:scale-105 text-white rounded-md h-10 w-44 ${cedarville.className}`}
                        disabled={isSubmitting}
                        type='submit'
                    >
                        Login
                    </button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    )
}

export default SignUp
