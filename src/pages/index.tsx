import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className='bg-gradient-to-r from-green-500 to-blue-500 h-screen flex justify-center items-center'>
      <h1 className='text-3xl font-bold'>Hello world!</h1>
    </div>
  )
}
