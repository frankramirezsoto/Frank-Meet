import StreamVideoProvider from '@/providers/StreamClientProvider';
import React, { ReactNode } from 'react'

const RootLayout = ({children}: {children:ReactNode}) => {
  return (
    <main>
      {/* Stream Video Provider used by Stream.io */}
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main> 
  )
}

export default RootLayout;