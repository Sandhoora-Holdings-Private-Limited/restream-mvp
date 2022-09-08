import type { NextPage } from 'next'
import {useState, useContext} from 'react'

import WebCam from '../libs/components/webCam'
import { signIn, signOut, useSession } from "next-auth/react"
import Link from 'next/link'

import {AppContext} from '../libs/context/appContext'

const Home: NextPage = () =>  {
  const { streamDetails: [streamData, setStreamData] } =  useContext(AppContext)

  const [ content , setContent ] = useState()
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  console.log("!!!!!!!!!! Session")
  console.log(session)
  return (
    <div className='text-center container'>
      <div className='row'>
        <div className='col-sm-3'></div>
        <div className='col-sm-6'>
          <h1>Start Streaming !</h1>
          {session && JSON.stringify(session)}
          <WebCam />

          <h5 className='my-2'>Before you get started, enter your stream title!</h5>

          <input type="text" className="form-control my-2" placeholder={streamData} onChange={(e)=>{console.log(e.target.value); setStreamData(e.target.value)}}></input>
          <Link href="/studio">
            <button className='btn btn-secondary my-2 px-5 py-1 btn-custom'>{"Let's Go!"}</button>
          </Link>

        </div>
        <div className='col-sm-3'></div>
      </div>
    
    </div>

  )
}

export default Home
