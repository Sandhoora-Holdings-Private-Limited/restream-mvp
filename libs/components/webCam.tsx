import Webcam from "react-webcam";
import {useState, useRef, useEffect} from 'react'
import MuteButton from './muteButton'
import VideoButton from './videoButton'



interface WebCamProps {
//   children: React.ReactNode
}



export default function WebCam({  }: WebCamProps) {
  const [ audioOnState , setAudioOnState ] = useState(false)
  const [ videoOnState , setvideoOnState ] = useState(true)

  const [triggerState, setTriggerState] = useState(null)


  const videoRef:any = useRef()

  
  async function enableStream() {
    console.log("enableStream")
    try {
        let stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: {
              echoCancellation: true,
              noiseSuppression: true
          }
        })
        videoRef.current.srcObject = stream
      } catch (err) {
        console.log(err)
      }
  }

  function cleanup() {
    if(videoRef.current) {
        videoRef.current.srcObject.getVideoTracks().forEach((track) => {
      track.stop()
    })
    }
  }

  useEffect(() => {
    console.log('user effected called ')
    if (videoRef.current) {
      if (!videoRef.current.srcObject)
      {enableStream()} else {
        return cleanup
      }
    } else {
      
    }
    
  }, [triggerState])

 const toggleAudio = () => {
    if(videoRef.current){
        if(audioOnState){
          videoRef.current.srcObject.getAudioTracks()[0].enabled = false
  
          const audios = videoRef.current.srcObject.getAudioTracks()[0]
          console.log(audios)
  
  
        } else {
          videoRef.current.srcObject.getAudioTracks()[0].enabled = true
  
          const audios = videoRef.current.srcObject.getAudioTracks()[0]
  
          console.log(audios)
        }
      }

    setAudioOnState(!audioOnState)

 }
 const toggleVideo = () => {
    if(videoRef.current){
        if(videoOnState){
          videoRef.current.srcObject.getVideoTracks()[0].enabled = false
  
          const video = videoRef.current.srcObject.getAudioTracks()[0]
          console.log(video)
  
  
        } else {
          videoRef.current.srcObject.getVideoTracks()[0].enabled = true
  
          const video = videoRef.current.srcObject.getAudioTracks()[0]
  
          console.log(video)
        }
      }

    setvideoOnState(!videoOnState)
 }

 const handleCanPlay = () => {
    videoRef.current.play()
  }

  return (
    <div className='row'>
        <div className='col'>
            {}
            <div className="camera-preview my-2 text-center container">
                
                {/* <Webcam className="camera-preview" 
                    audio={audioOnState} 
                    height={videoOnState ? 720 : 0}
                    width={videoOnState ? 1280 : 0}
                    imageSmoothing={true} 
                    onUserMedia={() => {console.log("Got stream !")}} 
                    onUserMediaError={() => {alert("error !")}}
                /> */}
                <video
                    className='camera-preview'
                    ref={videoRef}
                    onCanPlay={handleCanPlay}
                    autoPlay
                    playsInline
                    muted={!audioOnState}
                  />
            </div>
            <div className='row my-2'>
                <div className='col'>
                    
                    <MuteButton audioOn={audioOnState} fx={toggleAudio} />
                    
                    <VideoButton videoOn={videoOnState} fx={toggleVideo} />

                    <button type="button" className="btn btn-secondary round-btn mx-2 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
