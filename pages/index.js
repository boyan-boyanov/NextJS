import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getFeaturedEvents } from '../dummy-data'
import EventList from '../components/events/event-list'

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <EventList items={featuredEvents}/>
        </div>


      </main>


    </div>
  )
}
