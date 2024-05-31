import LoginForm from '@/components/Auth/LoginForm'
import React from 'react'

export default function page() {
  return (
    <div className="min-h-screen py-8 mt-24">
        <div className="grid md:grid-cols-2 grid-cols-1 w-full overflow-hidden max-w-5xl mx-auto bg-white border border-gray-200 rounded-lg shadow  dark:bg-black dark:border-gray-700">
            <div className="hidden md:flex linear-bg">
                {/*IMAGE*/}
            </div>
            <div className="">
                {/*FORM*/}
                <LoginForm />
            </div>
        </div>
    </div>
  )
}
