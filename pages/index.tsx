import type { NextPage } from 'next'

import Layout from '../libs/components/layout'
import Link from 'next/link'

const Home: NextPage = () =>  {
  return (
    // <Layout>
    //   <h1>NextAuth.js Example</h1>
    //   <p>
    //     This is an example site to demonstrate how to use <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication.
    //   </p>
    // </Layout>

    <div className='center-container'>
      <ul>
        <li>
          <Link href="/start_streaming">
            <a>Wire Frame 1 (Landing page)</a>
          </Link>
        </li>
        <li>
        <Link href="/studio">
            <a>Wire Frame 2 (Studio)</a>
          </Link>
        </li>
      </ul> 
    </div>

  )
}

export default Home
