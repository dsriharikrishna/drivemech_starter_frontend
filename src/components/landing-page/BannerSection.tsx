"use client";
import React from 'react'
import Image from 'next/image'

interface BannerSectionProps {
    image: string;
}

const BannerSection = ({image}: BannerSectionProps) => {
  return (
    <div className='w-full relative' style={{ height: '180px' }}>
      <div className='w-full h-full relative'>
        <Image 
          src={image} 
          alt="banner" 
          fill 
          className='object-contain w-full h-full'
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  )
}

export default BannerSection
