import React from 'react'
import DashboardPage from './page'
import { BarLoader } from 'react-spinners'
import { Suspense } from 'react'
const DashboardLayout = () => {
  return (
    <div className='max-w-screen-2xl w-full mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24'>
        <h1 className='text-6xl font-bold gradient-title mb-5'>Dashboard</h1>
        <Suspense fallback={<BarLoader className='mt-4' width="100%" color="#9333ea"/>}>
        <DashboardPage/>
        </Suspense>
        
    </div>
  )
}

export default DashboardLayout