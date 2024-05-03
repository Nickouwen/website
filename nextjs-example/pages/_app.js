import '../styles/global.css';
import Home from './index';

import { Red_Hat_Display } from 'next/font/google';

const redhat = Red_Hat_Display({subsets: ['latin']})

export default function myApp() {
        return (
            <div className={redhat.className}>
                <Home />
            </div>
        )
}