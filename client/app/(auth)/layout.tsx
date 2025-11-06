'use client'

import Image from 'next/image'
import React from 'react'
import Lottie from 'lottie-react'
import animationData from '@/public/lottie/auth-animation.json'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left section with illustration + animation */}
      <section className="bg-brand-bg p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <Image src="/favicon.ico" alt="Logo" width={80} height={80} className="h-auto mt-10" />
          <div className="space-y-5 text-light-100 mt-10">
            <h1 className="text-[55px] font-semibold  tracking-tight">
              Manage your files the best way
            </h1>
            <p className="text-[20px] leading-[24px] font-normal text-light-200">
              Access, organize, and share your files seamlessly with our intuitive platform.
            </p>
          </div>

          {/* Lottie animation with brand colors */}
          <div className="flex items-center justify-center">
            <Lottie animationData={animationData} loop autoplay className="h-[450px] w-[450px]" />
          </div>
        </div>
      </section>

      {/* Right section for auth form */}
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={82}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          />
        </div>
        {children}
      </section>
    </div>
  )
}

export default Layout
