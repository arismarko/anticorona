import Link from 'next/link';
import Layout from '../components/Layout';

export default () => (
    <Layout>
       <h1>About!</h1>
       <p>This site will a conference scheduling eventually</p>

       <p>
            <Link href="/contact"> 
                <a>Get in touch</a>
            </Link>
       </p>
    </Layout>
)