import '../styles/global.css';

import { Red_Hat_Display } from 'next/font/google';

const redhat = Red_Hat_Display({subsets: ['latin']})

export default function myApp({ Component, pageProps }) {
        return <Component { ...pageProps } />
}