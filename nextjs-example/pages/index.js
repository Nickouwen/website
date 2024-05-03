import Head from 'next/head';
import Link from 'next/link';


function Header() {
  return(
  <header className="bg-black sticky top-0">
    <nav className="flex justify-center text-3xl space-x-8">
      <Link href="/" className="content-center">
        <img className="h-36" src="/logo.png" alt="Logo"/>
      </Link>
      <Link href="/otherpage" className="content-center">
        <h1 className="text-white">Menu</h1>
      </Link>
    </nav>
  </header>
  )
}
function Footer() {
  return(
    <footer className="bg-black h-100">
      <p className="text-white">Hello</p>
    </footer>
  )
}
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>JAC's On The Beach</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />

      <main className="bg-body columns-2">
        <div className="text-white">
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
          <h1>About</h1>
        </div>
      </main>

      <Footer />
    </div>
  );
}
