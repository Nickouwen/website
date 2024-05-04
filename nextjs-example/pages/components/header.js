import Link from 'next/link';


export default function Header() {
    return(
    <header className="bg-black sticky top-0 text-white">
      <nav className="flex justify-evenly text-2xl space-x-8">
        <Link href="/" className="content-center">
          <img className="h-36" src="/logo.png" alt="Logo"/>
        </Link>
        <Link href="/menus/otherpage" className="content-center">
          <h1>Menu</h1>
        </Link>
        <Link href="/menus/otherpage" className="content-center">
          <h1>Contact</h1>
        </Link>
      </nav>
    </header>
    )
  }