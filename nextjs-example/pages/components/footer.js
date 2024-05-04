import Link from 'next/link';
import Image from 'next/image';


export default function Footer() {
    return(
      <footer className="bg-black text-white p-10 columns-3">
        <div>
          <h1 className="text-xl">JAC's ON THE BEACH</h1>
          <p>5866B Beach Ave.</p>
          <p>Peachland, BC</p>
          <p>123-456-7890</p>
        </div>
        <div>
          <h1 className="text-xl">Hours</h1>
          <br />
          <p>8am - 8pm Daily</p>
          <br />
        </div>
        <br />
        <br />
        <div className="flex w-10">
          <Link href="https://www.facebook.com/people/JACs-On-The-Beach/61556229514466/">
          <Image
          className="bg-white rounded-full"
          src="/fb_logo.svg"
          alt="Facebook"
          width="40"
          height="40"
          />
          </Link>
        </div>
      </footer>
    )
  }