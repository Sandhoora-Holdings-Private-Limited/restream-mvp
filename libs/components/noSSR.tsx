import dynamic from 'next/dynamic'
import React from 'react'

interface NoSsrProps {
    children: React.ReactNode
  }

function NoSsr({ children }: NoSsrProps) {
    return <>{children}</>
}

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false
})
