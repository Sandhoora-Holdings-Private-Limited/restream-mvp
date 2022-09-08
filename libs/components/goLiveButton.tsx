interface GoLiveButtonProps {
    status : string,
    fxGoLive: any,
    fxCompleteLive: any,
    disabled: boolean
}

export default function GoLiveButton({ status, fxGoLive, fxCompleteLive, disabled}: GoLiveButtonProps) {
  switch(status)
  {
    case 'NOT_LIVE':
      return <button className='btn btn-secondary my-1 px-5 py-1 float-right' disabled={disabled} onClick={fxGoLive} > Go Live ! </button>
    case 'LIVE':
        return <button className='btn btn-danger my-1 px-5 py-1 float-right' onClick={fxCompleteLive} > Stop Live ! </button>
    
    
    case 'CREATING_BROADCAST':
      return (<button className='btn btn-secondary my-1 px-5 py-1 float-right' disabled={true}> 
              <div className="loader-1 center container"><span></span></div> 
              Creating Broadcast ! 
            </button>)

    case 'CREATING_STREAM':
      return (<button className='btn btn-secondary my-1 px-5 py-1 float-right' disabled={true}> 
              <div className="loader-1 center container"><span></span></div> 
              Creating Stream ! 
            </button>)

    case 'STARTING_BINDING_BROADCAST_TO_STREAM':
      return (<button className='btn btn-secondary my-1 px-5 py-1 float-right' disabled={true}> 
              <div className="loader-1 center container"><span></span></div> 
              Binding Broadcast to Stream ! 
            </button>)
  
    case 'STARTING_STREAM':
      return (<button className='btn btn-secondary my-1 px-5 py-1 float-right' disabled={true}> 
              <div className="loader-1 center container"><span></span></div> 
              Binding Broadcast to Stream ! 
            </button>)
    
    case 'GOING_LIVE':
      return (<button className='btn btn-danger my-1 px-5 py-1 float-right' disabled={true}> 
              <div className="loader-1 center container"><span></span></div> 
              Going Live ! 
            </button>)

    case 'COMPLETING_LIVE':
      return (<button className='btn btn-success my-1 px-5 py-1 float-right' disabled={true}> 
              <div className="loader-1 center container"><span></span></div> 
              Stopping Live ! 
            </button>)

    
    default:
      return <>Invalid State</>
  }
  
}



