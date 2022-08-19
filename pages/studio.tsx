import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Layout from '../libs/components/layout'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Webcam from "react-webcam";

const Studio: NextPage = () => {
  const { data: session, status } = useSession()
  
console.log(status)
console.log(session)


    return (
      <div>
        Studio !
      </div>
    // <Layout>
    //       <Webcam audio={true} 
    //         imageSmoothing={true} 
    //         onUserMedia={() => {console.log("Got stream !")}} 
    //         onUserMediaError={() => {console.log("error !")}} />
    // </Layout>
    )
  }
  
  export default Studio
  