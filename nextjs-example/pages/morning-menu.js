import Link from 'next/link';
import Image from 'next/image';
import Header from './components/header';
import Footer from './components/footer';

export default function Breakfast() {
    return (
        <div className="container mx-4 lg:mx-16">
            <Header/>
            <main>
                <div className="text-red-600 flex lg:mx-20">
                    <div className="lg:w-1/2 lg:flex lg:flex-col">
                        <h1 className="text-4xl lg:text-6xl font-semibold my-2 lg:translate-y-4 mt-16">BREAKFAST</h1>
                        <p className="text-base lg:text-2xl font-semibold my-2 lg:translate-y-4">SERVED UNTIL 11AM</p>
                    </div>
                    <div className="w-1/2 flex justify-end mt-16">
                        <img loading="lazy" src="Logo-justletters.png" alt="Logo" className="w-24 lg:w-48 lg:mt-0 mt-2"/>
                    </div>
                </div>
                <div  className="lg:columns-2 lg:mx-20 lg:mt-4">
                    <div className="text-black text-center inline-block bg-white/60 border-solid border-red-600 border-2 my-5 w-full lg:mr-6"> {/* Standard Breakfast Items */}
                        <h1 className="text-red-700 text-2xl font-bold mt-5">BREAKFAST</h1>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">BREAKFAST SANDWICH</h1>
                            <p>Bacon, sausage or ham, egg, grilled tomato, melted cheese, brioche bun, hashbrowns</p>
                            <p className="font-bold">$15</p>
                        </div>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">TRADITIONAL</h1>
                            <p>Any style choice of 2 eggs, bacon, sausage or ham, hashbrowns, toast</p>
                            <p className="font-bold">$17</p>
                        </div>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">AVOCADO TOAST</h1>
                            <p>Avocado crush, crumbled feta, heirloom tomatoes, watermelon radish, pickled red onion, hemp seed, S&P, olive oil drizzle, 2 poached eggs, side tender greens</p>
                            <p className="font-bold">$18</p>
                        </div>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">CROQUE MADAME</h1>
                            <p>Grilled sourdough, black forest ham, shaved gruyère, grainy dijon, mornay sauce, sunny egg on top</p>
                            <p className="font-bold text-lg">$19</p>
                        </div>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">SMOKED BRISKET HASH</h1>
                            <p>Bell peppers, onions, hashbrowns, smoked ketchup, topped with 2 poached eggs</p>
                            <p className="font-bold text-lg">$19</p>
                        </div>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">CHORIZO SCRAMBLE</h1>
                            <p>Bell peppers, onions, mushrooms, hashbrowns, cheese, 2 scrambled eggs</p>
                            <p className="font-bold text-lg">$19</p>
                        </div>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">CHICKEN & WAFFLES</h1>
                            <p>Buttermilk marinated chicken breast between crisp waffles, topped with maple pecan butter</p>
                            <p className="font-bold text-lg">$20</p>
                        </div>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">SWEETS</h1>
                            <p>Choice of buttermilk pancakes, belgium waffles or french toast, citrus crème anglaise, caramelized banana, walnuts and triple berry compote</p>
                            <p className="font-bold text-lg">$16</p>
                        </div>
                        <div className="mt-3 mb-4">
                            <h1 className="font-bold text-lg">JAC'S FRENCH TOAST</h1>
                            <p>Stacked 4 high! Peanut butter, Nutella, fried, cinnamon sugar, crème anglaise drizzle</p>
                            <p className="font-bold text-lg">$20</p>
                        </div>
                    </div>
                    <div></div>
                    <div></div>
                    <div className="text-black text-center inline-block bg-white/60 border-solid border-red-600 border-2 my-5 w-full lg:ml-6"> {/* Eggs Benedict */}
                        <h1 className="text-red-700 text-2xl font-bold mt-5">EGGS BENEDICT</h1>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">CLASSIC BENNY</h1>
                            <p>English muffins, back bacon, poached eggs, hollandaise sauce</p>
                            <p className="font-bold">$18</p>
                        </div>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">BENNY BLACKSTONE</h1>
                            <p>English muffins, grilled tomato, double smoked bacon, hollandaise sauce</p>
                            <p className="font-bold">$18</p>
                        </div>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">VEGGIE BENNY</h1>
                            <p>English muffins, heirloom tomatoes, spinach and feta, hollandaise sauce</p>
                            <p className="font-bold">$18</p>
                        </div>
                        <div className="mt-3 mb-4">
                            <h1 className="font-bold text-lg">CRAB & ASPARAGUS BENNY</h1>
                            <p>English muffins, crab and asparagus tips, hollandaise sauce</p>
                            <p className="font-bold">$20</p>
                        </div>
                    </div>
                    <div className="text-black text-center inline-block bg-white/60 border-solid border-red-600 border-2 my-5 w-full lg:ml-6"> {/* Omelettes */}
                        <h1 className="text-red-700 text-2xl font-bold mt-5">OMELETTES</h1>
                        <p>All come with hashbrowns and toast</p>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">CRAB & ASPARAGUS OMELETTE</h1>
                            <p>Crab, asparagus tips, havarti, topped with hollandaise sauce</p>
                            <p className="font-bold">$20</p>
                        </div>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">JAC's OMELETTE</h1>
                            <p>Onions, mushrooms, havarti, JAC's sauce</p>
                            <p className="font-bold">$20</p>
                        </div>
                        <div className="mt-3">
                            <h1 className="font-bold text-lg">WESTERN OMELETTE</h1>
                            <p>Ham, mushrooms, green onions, cheese</p>
                            <p className="font-bold">$16</p>
                        </div>
                        <div className="mt-3 mb-4">
                            <h1 className="font-bold text-lg">SPINACH OMELETTE</h1>
                            <p>Peppers, onions, mushrooms, cheese & salsa</p>
                            <p className="font-bold">$16</p>
                        </div>
                    </div>
                    <div className="text-black text-center inline-block bg-white/60 border-solid border-red-600 border-2 my-5 w-full lg:ml-6"> {/* Add-Ons */}
                        <h1 className="text-red-700 text-2xl font-bold mt-5">ADD-ONS</h1>
                        <h1 className="font-bold text-lg">ADD EGG $2</h1>
                        <h1 className="font-bold text-lg mb-4">ADD SAUSAGE OR BACON $4</h1>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )   
}   