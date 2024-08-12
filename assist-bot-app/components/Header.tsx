import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'
import { SignedIn, SignedOut,SignInButton, UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <header className='b-white shadow-sm text-gray-800 flex'>
        <Link href ="/" className='flex items-center text-4xl font-thin'>
        <Avatar seed='Chatbot'/>

        <div className='space-y-1'>
        <h1>Tanıtma ChatBot</h1>
        <h2 className='text-sm'>Admin Paneli</h2>
            </div>
        </Link>

        <div className='flex items-center'>
          <SignedIn>
            <UserButton  showName/>
          </SignedIn>

          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
    </header>
  )
}

export default Header