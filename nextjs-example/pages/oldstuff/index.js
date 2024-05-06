import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from './components/header';
import Footer from './components/footer';




export default function Home() {
  return (
    <div className="container font-bold">
      <Head>
        <title>JAC's On The Beach</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />

      <main className="bg-body">
        <div className="text-white columns-2">
          <h1 className="ml-8">About</h1>
          <div className="float-right">
            <Image 
            src="/tacos.jpg"
            width={200}
            height={200}
            alt="Tacos"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
