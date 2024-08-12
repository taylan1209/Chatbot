import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'

function Header() {
  return (
    <header>
        <Link href ="/">
        <Avatar seed='Chatbot'/>

        <div>
        <h1>Tanıtma ChatBot</h1>
        <h2>Admin Paneli</h2>
            </div>
        </Link>
    </header>
  )
}

export default Header