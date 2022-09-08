import type { NextPage } from 'next'
import Studio from '../libs/components/studio'
import NoSsr from '../libs/components/noSSR'

const Test: NextPage = () => {
  return (  
  <>
  

  <NoSsr>
    <Studio/>
  </NoSsr>

  
  </>)
}
  
  export default Test
  