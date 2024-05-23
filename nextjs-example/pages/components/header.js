import Link from 'next/link';
import { slide as Menu } from 'react-burger-menu';
import Image from 'next/image';

var styles = {
  bmBurgerButton: {
    position: 'absolute',
    width: '36px',
    height: '30px',
    left: '24px',
    top: '24px'
  },
  bmBurgerBars: {
    background: 'rgba(255,255,255)',
    opacity: '1'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    listStyleType: 'none',
    display: 'flex',
    background: 'black',
    padding: '2.5em 1.5em',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '',
  },
  bmItem: {
    display: 'block',
    padding: '1rem 0'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}


export default function Header() {
    return(
      <header className="text-white/80 text-2xl font-bold overflow-auto">
          <nav className="hidden lg:flex justify-center mt-8"> {/* Menu, About, Gallery, Find Us, Contact */}
              <ul className="flex justify-evenly w-4/5">
                  <Link href="/"><li className="hover:text-white">Home</li></Link>
                  <Link href="/"><li className="hover:text-white">Menus</li></Link>
                  <Link href="/"><li className="hover:text-white">Find Us</li></Link>
                  <Link href="/"><li className="hover:text-white">Contact</li></Link>
              </ul>
          </nav>
          <div className="lg:hidden opacity-80 hover:opacity-100">
              <Menu styles={ styles }>
                  <Link href="/"><li className="hover:text-white">Home</li></Link>
                  <Link href="/"><li className="hover:text-white">Menus</li></Link>
                  <Link href="/"><li className="hover:text-white">Find Us</li></Link>
                  <Link href="/"><li className="hover:text-white">Contact</li></Link>
              </Menu>
          </div>
      </header>
    )
  }