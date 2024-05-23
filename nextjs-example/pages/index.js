import Head from 'next/head';
import Image from 'next/image';
import Map from './components/map';
import Link from 'next/link';
import Carousel from './components/carousel';
import Header from './components/header';
import Footer from './components/footer';

export default function Home() {
    return (
    <div className="container">
        <Head>
            <title>JAC's On The Beach</title>
            <link rel="icon" href="/Logo-justletters.png" />
        </Head>
        <Header/>
        <main>
            <div className="flex justify-center mx-8 mt-12"> {/* Logo, visual flair */}
                  <Image
                  src="/Logo-justletters.png"
                  width={497}
                  height={300}
                  alt="Logo"
                  />
            </div>
              <div className="flex justify-center mt-4 text-white">
                  <h1 className="text-xl lg:text-2xl">5866B Beach Ave, Peachland, BC</h1>
              </div>
              <div className="border-solid border-red-500 border-x-0 border-y-4 h-3 mt-24 mb-8"></div>
            <div className="lg:columns-3 lg:justify-evenly flex flex-col lg:flex-row items-center text-center text-4xl font-bold"> {/* Menu links (drinks, mains, dessert) */}
                <Link href="/morning-menu" className="m-6 text-white/80 hover:text-white">
                    <div>
                        <h1>BREAKFAST</h1>
                    </div>
                </Link>
                <Link href="/" className="m-6 text-white/80 hover:text-white">
                    <div>
                        <h1>LUNCH / DINNER</h1>
                    </div>
                </Link>
                <Link href="/" className="m-6 text-white/80 hover:text-white">
                    <div>
                        <h1>DRINKS</h1>
                    </div>
                </Link>
            </div>
            <div className="border-solid border-red-500 border-x-0 border-y-4 h-3 mt-8 clear-both"></div>
            <div className="text-white bg-stone-900 py-8 h-full lg:flex items-center"> {/* About section */}
                <div className="mx-8 justify-middle font-semibold lg:w-[38rem] flex items-center flex-col">
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
                <div className="w-11/12 lg:w-1/2 lg:float-right mt-8 lg:m-0 mx-4">
                    <img className="rounded-sm lg:rounded-full lg:shadow-xl lg:shadow-white/20"
                    src="/caesar.jpg"
                    alt="Caesar"/>
                </div>
            </div>
            <div className="border-solid border-red-500 border-x-0 border-y-4 h-3"></div>
            <div className="h-[48rem]"> {/* Photo gallery */}
                <Carousel />
            </div>
            <div className="border-solid border-red-500 border-x-0 border-y-4 h-3"></div>
                <div className="h-[40rem]"> {/* Map of location */}
                    <Map/>
                </div>
            <div className="border-solid border-red-500 border-x-0 border-y-4 h-3"></div>
        </main>
        <Footer />
    </div>
    )
}