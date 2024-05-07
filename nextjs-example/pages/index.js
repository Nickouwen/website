import Head from 'next/head';
import Image from 'next/image';
import Map from './components/map';
import Link from 'next/link';
import Carousel from './components/carousel';


export default function Home() {
    return (
    <div className="container">
        <Head>
            <title>JAC's On The Beach</title>
            <link rel="icon" href="/Logo-justletters.png" />
            <style>{'body {background-color: black;}'}</style>
        </Head>
        <header className="text-white/80 text-2xl font-bold">
            <nav className="flex justify-center mt-8"> {/* Menu, About, Gallery, Find Us, Contact */}
                <ul className="flex justify-evenly w-4/5">
                    <li className="hover:text-white">Home</li>
                    <li className="hover:text-white">Menu</li>
                    <li className="hover:text-white">Find Us</li>
                    <li className="hover:text-white">Contact</li>
                </ul>
            </nav>
            <div className="flex justify-center mx-8 mt-12"> {/* Logo, visual flair */}
                <Image
                src="/Logo-justletters.png"
                width={497}
                height={300}
                alt="Logo"
                />
            </div>
            <div className="flex justify-center mt-4 text-white">
                <h1>5866B Beach Ave, Peachland, BC</h1>
            </div>
            <div className="border-solid border-red-500 border-x-0 border-y-4 h-3 mt-24 mb-8"></div>
        </header>
        <main>
            <div className="columns-3 justify-evenly flex text-white font-bold text-xl text-center h-64"> {/* Menu links (drinks, mains, dessert) */}
                <div>
                    <img 
                    className="h-full oject-cover"
                    src="/Drinks.png"
                    alt="Drinks"/>
                </div>
                <div>
                    <img
                    className="h-full object-cover"
                    src="/Starters.png"
                    alt="Starters"/>
                </div>
                <div>
                    <img
                    className="h-full object-cover"
                    src="/Mains.png"
                    alt="Mains"/>
                </div>
            </div>
            <div className="border-solid border-red-500 border-x-0 border-y-4 h-3 mt-12 clear-both"></div>
            <div className="text-white bg-stone-900 py-8 h-full flex items-center"> {/* About section */}
                <div className="mx-8 justify-middle font-semibold w-[38rem] flex items-center flex-col">
                    <h1 className="text-2xl font-bold">About JAC's</h1>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <p>JAC's On The Beach is a casual family restaurant located right off beautiful Beach Avenue in Peachland.</p>
                    <br/>
                    <br/>
                    <p>Our restaurant is more than just a place to eat; it's a place where families and friends gather to share moments and meals together. Our dedicated staff strives to provide a warm, inviting atmosphere where everyone feels part of the Peachland family.</p>
                    <br/>
                    <br/>
                    <p>Whether you're a longtime local or just passing through, we invite you to come dine with us and experience the warmth and charm of our family restaurant. Enjoy a meal with us and let us share with you the heart of Peachland hospitality!</p>
                </div>
                <div className="w-1/2 float-right">
                    <img className="rounded-full shadow-xl shadow-white/20"
                    src="/caesar.jpg"
                    alt="Caesar"/>
                </div>
            </div>
            <div className="border-solid border-red-500 border-x-0 border-y-4 h-3 mb-8"></div>
            <div className="h-[48rem]"> {/* Photo gallery */}
                <Carousel />
            </div>
            <div className="border-solid border-red-500 border-x-0 border-y-4 h-3 mt-12"></div>
            <div className="h-[40rem]"> {/* Map of location */}
            <Map/>
            </div>
            <div className="border-solid border-red-500 border-x-0 border-y-4 h-3"></div>

        </main>
        <footer className="text-white font-semibold flex justify-evenly columns-3 my-12"> {/* Links, location, hours, facebook, email, phone # */}
            <div className="text-center">
                <h1 className="text-xl underline">Links</h1>
                <Link href="https://www.facebook.com/people/JACs-On-The-Beach/61556229514466/">
                    <img src="/fb_logo.svg" alt="Facebook" className="h-12 w-12 mt-4"></img>
                </Link>
            </div>
            <div className="text-center">
                <h1 className="text-xl underline">Hours</h1>
                <p className="align-right">Daily: 8am - 8pm</p>
                <p>Happy Hour: 2pm - 4pm</p>
            </div>
            <div className="text-center">
                <h1 className="text-xl underline">Location</h1>
                <p>5866B Beach Ave <br/> Peachland, BC <br/> V0H-1X7</p>
            </div>
        </footer>
    </div>
    )
}