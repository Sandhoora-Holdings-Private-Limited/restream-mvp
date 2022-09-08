interface PlatformConnectionButtonProps {
    status : string,
    connect: any,
    disconnect: any,
    disabled: boolean
}

export default function PlatformConnectionButton({ status, connect, disconnect, disabled }: PlatformConnectionButtonProps) {
  switch(status)
  {
    case 'NOT_CONNECTED':
      return (
        <div className="center container">
          <label className="switch">
            <input onClick={connect} type="checkbox" checked={false}  disabled={disabled}/>
            <span className="slider round"></span>
          </label>
        </div>
      )
    case 'CONNECTED':
      return (
        <div className="center container">
          <label className="switch">
            <input onClick={disconnect} type="checkbox" checked={true} disabled={disabled}/>
            <span className="slider round"></span>
          </label>
        </div>)
    case 'CONNECTING':
      return  <div className="loader-1 center container"><span></span></div>
    default:
      return <>Invalid</>
  }
  
}
