import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: "Da Landing",
	description: "Da Landing",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='h-[100vh]'>
          <div className='min-h-vh-minus-header'>
						{children}	
					</div>	
      </body>
    </html>
  )
}
