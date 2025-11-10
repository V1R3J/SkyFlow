'use client'

import Image from 'next/image'
import React from 'react'
import Lottie from 'lottie-react'
import animationData from '@/public/lottie/auth-animation.json'
import logo from '@/app/logo.svg'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Left section - OPTIMIZED */}
      <section className="bg-brand-bg p-6 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5">
        <div className="flex max-h-[90vh] max-w-[400px] flex-col justify-center space-y-8">
          <Image src={logo} alt="Logo" width={60} height={60} className="h-auto" />
          <div className="space-y-4 text-light-100">
            <h1 className="text-3xl xl:text-4xl font-semibold tracking-tight">
              Manage your files the best way
            </h1>
            <p className="text-base xl:text-lg leading-relaxed font-normal text-light-200">
              Access, organize, and share your files seamlessly with our intuitive platform.
            </p>
          </div>

          {/* Lottie animation - RESIZED */}
          <div className="flex items-center justify-center">
            <Lottie animationData={animationData} loop autoplay className="h-[280px] w-[280px] xl:h-[320px] xl:w-[320px]" />
          </div>
        </div>
      </section>

      {/* Right section - OPTIMIZED */}
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-8 lg:justify-center lg:p-8">
        <div className="mb-12 lg:hidden">
          <Image
            src={logo}
            alt="Logo"
            width={60}
            height={60}
            className="h-auto"
          />
        </div>
        {children}
      </section>
    </div>
  )
}

export default Layout
