"use client";

import { Cedarville_Cursive } from 'next/font/google';
import toast from 'react-hot-toast';

const cedarville = Cedarville_Cursive({ weight: '400', subsets: ['latin'] });

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

export default function Home() {

  const postLetter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const author = formData.get('author') as string

    try {
      const response = await fetch('/api/letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          content: content,
          author: author,
        }),
      });
      
      if (response.ok) {
        toast.success('Letter posted successfully');
      } else {
        toast.error('Failed to post letter');
      }
    } catch (error) {
      toast.error('Failed to post letter: ' + error);
    }
  }

  return (
    <div className="text-white">
      <main className="flex flex-col justify-center h-screen w-screen items-center gap-10" >

        <h1 className={`text-7xl font-bold ${cedarville.className}`}>Palanca Letter</h1>

        <form onSubmit={postLetter} className="w-[400px] pl-12 flex flex-col justify-end items-end gap-5">

          <div className='flex flex-row gap-2 justify-center items-end '>
            <h1 className={`text-xl font-bold ${cedarville.className}`}>Title: </h1>
            <input name='title' className="w-96 bg-transparent outline-none border-b" />
          </div>

          <div className='flex flex-row justify-end items-end gap-2'>
            <h2 className={`text-xl font-bold ${cedarville.className}`}>Letter: </h2>
            <textarea name='content' className="w-[385px] h-40 border-b bg-transparent outline-none resize-none"/>
          </div>

          <div className='flex flex-row justify-center items-end gap-2'>
            <h1 className={`text-xl font-bold ${cedarville.className}`}>Sincerely: </h1>
            <input name='author' className="w-96 bg-transparent outline-none border-b" />
          </div>

          <button type='submit' className={`hover:scale-110 font-bold py-2 text-2xl px-4 rounded ${cedarville.className}`}>
            Sign
          </button>
          
        </form>

      </main>
      <footer className="relative flex justify-center items-center h-20 text-white">
        <p className="text-center">© 2024 pacasiano</p>
        <span className='absolute right-5'>
          <Link href='/admin/login'>
            <FontAwesomeIcon icon={faUserCircle} className='h-10 hover:scale-110 cursor-pointer'/>
          </Link>
        </span>
      </footer>
    </div>
  );
}