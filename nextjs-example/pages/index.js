import Head from 'next/head';
import Image from 'next/image';


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
                    <li className="hover:text-white">Menu</li>
                    <li className="hover:text-white">About</li>
                    <li className="hover:text-white">Home</li>
                    <li className="hover:text-white">Find Us</li>
                    <li className="hover:text-white">Contact</li>
                </ul>
            </nav>
            <div className="flex justify-center mx-8 mt-8"> {/* Logo, visual flair */}
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
            <div> {/* About section */}

            </div>
            <div> {/* Menus? */}

            </div>
            <div> {/* Photo gallery */}

            </div>
            <div> {/* Map of location */}

            </div>
        </main>
        <footer> {/* Links, location, hours, facebook, email, phone # */}
            

        </footer>
    </div>
    )
}