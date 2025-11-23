"use client";

import React, { Suspense } from 'react'
import ForgotMpinVerifyPage from './ForgotMpinVerifyPage'

function ForgotMpinVerifyWrapper() {
  return (
    <Suspense fallback={<div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8"><div className="text-center">Loading...</div></div>}>
      <ForgotMpinVerifyPage />
    </Suspense>
  )
}

const page = () => {
  return <ForgotMpinVerifyWrapper />
}

export default page

