import Link from 'next/link';
import Image from 'next/image';


export default function Footer() {
    return(
      <footer className="text-white font-semibold flex justify-evenly columns-3 my-12"> {/* Links, location, hours, facebook, email, phone # */}
            <div className="text-center">
                <h1 className="lg:text-xl underline">Links</h1>
                <Link href="https://www.facebook.com/people/JACs-On-The-Beach/61556229514466/">
                    <img src="/fb_logo.svg" alt="Facebook" className="h-12 w-12 mt-4"></img>
                </Link>
            </div>
            <div className="text-center">
                <h1 className="lg:text-xl underline">Hours</h1>
                <p className="text-sm lg:text-base">Daily: 8am - 8pm</p>
                <p className="text-sm lg:text-base">Happy Hour: 2pm - 4pm</p>
            </div>
            <div className="text-center">
                <h1 className="lg:text-xl underline">Location</h1>
                <p className="text-sm lg:text-base">5866B Beach Ave <br/> Peachland, BC <br/> V0H-1X7</p>
            </div>
        </footer>
    )
  }