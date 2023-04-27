import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head';
import dynamic from 'next/dynamic';
const  Todaystasks = dynamic(() => import('@/components/todaystasks/todays'), { ssr: false });
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
    <Head>
      <title>TODO App</title>
      <link rel="icon" href="/todo.png" />
    </Head>
    <Todaystasks/>
    </div>
  )
}
