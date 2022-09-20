import React, { useState, useEffect, useRef, useContext } from 'react'
import Webcam from "react-webcam";
import Image from 'next/image'
import youtube from '../../public/youtube.png'
import facebook from '../../public/facebook.png'
import twitch from '../../public/twitch.png'

import {AppContext} from '../context/appContext'


// import Navbar from '../../components/Navbar/Navbar'
import BroadcastButton from './broadcastButton'
import io from "socket.io-client";
import PlatformConnectionButton from './platformConnectionButton';
import GoLiveButton from './goLiveButton'
import MuteButton from './muteButton';
import VideoButton from './videoButton';
import { disconnect } from 'process';
// import Timer from '../../components/Timer/Timer'
// import formatTime from '../../utils/formatTime'
// import getCookie from '../../utils/getCookie'
// import API from '../../api/api'
// import './Broadcast.css'
// import { useGoogleApi } from 'react-window.gapi'

const CAPTURE_OPTIONS = {
  audio: {
    echoCancellation: true,
    noiseSuppression: true},
  video: true,
}

/* global window.gapi */

export default function Studio() {

  const [isVideoOn, setisVideoOn] = useState(true)
  const [mute, setMute] = useState(true)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const [youtubeIngestionUrl, setYoutubeIngestionUrl] = useState('')
  const [youtubeStreamName, setYoutubeStreamName] = useState('')
  const [facebookStreamKey, setFacebookStreamKey] = useState('')
  const [twitchStreamKey, setTwitchStreamKey] = useState('')

  const [mediaStream, setMediaStream] = useState(null)
  const [userFacing, setuserFacing] = useState(false)

  const [streamId, setstreamId] = useState('')
  const [broadcastId, setbroadcastId] = useState('')

  const [isStreaming, setIsStreaming] = useState(false)

  const [youTubeConnectionStatus, setYouTubeConnectionStatus] = useState('NOT_CONNECTED')
  const [anyPlatformConnected, setAnyPlatformConnected] = useState(false)

  const [liveStatus, setLiveStatus] = useState('NOT_LIVE')

  const { streamDetails } = useContext(AppContext)


  const videoRef:any = useRef()
  const ws:any = useRef(false)
  const liveStreamRecorder:any = useRef(false)


  const productionWsUrl = 'wss://www.ohmystream.xyz/websocket'
  // const developmentWsUrl = 'http://13.215.83.42:3001/'
  // const developmentWsUrl = 'https://reback.sandhooraholdings.lk'
  
  // const developmentWsUrl = 'http://localhost:3001/'
  const developmentWsUrl = 'https://restreamsslbe.sandhooraholdings.lk/'

  // https://restreamsslbe.sandhooraholdings.lk/


  //!!! THIS IS THE URL I AM STREAMING TO
  const youtubeUrl = youtubeIngestionUrl + '/' + youtubeStreamName
  // const youtubeUrl = youtubeIngestionUrl


  const streamUrlParams = `?twitchStreamKey=${twitchStreamKey}&youtubeUrl=${youtubeUrl}&facebookStreamKey=${facebookStreamKey}`

  let liveStream

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
  }

  async function getMediaConstraints() {
    if(videoRef.current){
      const audios = videoRef.current.srcObject.getAudioTracks()[0].getConstraints()
      const videos = videoRef.current.srcObject.getVideoTracks()[0].getConstraints()
      console.log(audios)
      console.log(videos)
  } else console.log('No Stream')
}
  async function enableStream() {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: {
          echoCancellation: true,
    noiseSuppression: true
        }
      })
      setMediaStream(stream)
    } catch (err) {
      console.log(err)
    }
  }

  function cleanup() {
    mediaStream.getVideoTracks().forEach((track) => {
      track.stop()
    })
  }

  useEffect(() => {
    if (!mediaStream) {
      enableStream()
    } else {
      return cleanup
    }

  }, [mediaStream])

//   useEffect(() => {
//     // let userId = getCookie('userId')

//     API.post('/destinations', { userId })
//       .then((response) => {
//         if (response) {
//           setTwitchStreamKey(response.data.twitch_stream_key)
//           setFacebookStreamKey(response.data.facebook_stream_key)
//         }
//       })
//       .catch((err) => console.log(err))
//   }, [])

  // useEffect( () => {
   
  //     ws.current = io(developmentWsUrl + streamUrlParams)
  //     console.log(ws.current)
      

  //   ws.current.on('connect', () => {
  //     console.log('socket connected')
  //     console.log(ws.current)
  //   })

  //   ws.current.on('disconnect', (reason:any) => {
  //     console.log('socket disconnected, reason : ', reason)
  //     console.log(ws.current)
  //   })

  //   ws.current.on("connect_error", (error:any) => {
  //     console.log('socket error , error : ', error)
  //     console.log(ws.current)
  //   });

  //   ws.current.on("streaming", ()=> {
  //     setIsStreaming(true)
  //   }) 

    

  //   return () => {
  //     if(ws.curret){
  //       ws.current.disconnect()
  //       ws.current.close()
  //       ws.current = false
  //     }
     
  //   }


  // }, [twitchStreamKey, youtubeStreamName, isActive])

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])
 

  const toggle = () => {
    setIsActive(!isActive)
  }

  const startStream = async (streamURL) => {

    
    return new Promise((resolve, reject) => {

      try{
     
      toggle()
      liveStream = videoRef.current.captureStream(30) // 30 FPS
      liveStreamRecorder.current = new MediaRecorder(liveStream, {
        mimeType: 'video/webm;codecs=h264',
        videoBitsPerSecond: 3 * 1024 * 1024,
      })
      liveStreamRecorder.current.ondataavailable = (e:any) => {
          console.log('sending data : ', e.data)
          if(ws.current) {
            ws.current.emit("data",e.data)
          }
        }
      // Start recording, and dump data every second
      liveStreamRecorder.current.start(1000)


      const streamUrlParamsLocal = `?twitchStreamKey=${twitchStreamKey}&youtubeUrl=${streamURL}&facebookStreamKey=${facebookStreamKey}`
      
      ws.current = io(developmentWsUrl + streamUrlParamsLocal)
      console.log(ws.current)
      

    ws.current.on('connect', () => {
      console.log('socket connected')
      console.log(ws.current)
    })

    ws.current.on('disconnect', (reason:any) => {
      console.log('socket disconnected, reason : ', reason)
      console.log(ws.current)
    })

    ws.current.on("connect_error", (error:any) => {
      console.log('socket error , error : ', error)
      console.log(ws.current)
      ws.current.disconnect()
      ws.current.close()
      ws.current = false
      error.cutomMessage = "Error in web socket creation"
      reject(error)
    });

    ws.current.on("streaming", ()=> {
      console.log("String emit recived")
      // setIsStreaming(true)
      resolve("Done") 
    }) 

  } catch (err) {
    err.cutomMessage = "Error in startStream"
   console.log(err)
    reject(err)}

      // if (isStreaming) resolve("Done") 
    })
  }

  const stopStream = () => {

    try{
    console.log('Stop recording')
    if(ws.current){
      ws.current.disconnect()
      ws.current.close()
      ws.current = false
    }

    if(liveStreamRecorder.current){
      liveStreamRecorder.current.stop()
      liveStreamRecorder.current = false
    }
    
    setIsActive(false)
    setIsStreaming(false)
  }
  catch (err) {
    err.cutomMessage = "Error in stopStream"
    throw err}
  }

  const toggleMute = () => {
    console.log("mute tuggled ", !mute)
    if(videoRef.current){
      if(!mute){
        videoRef.current.srcObject.getAudioTracks()[0].enabled = false

        const audios = videoRef.current.srcObject.getAudioTracks()[0]
        console.log(audios)


      } else {
        videoRef.current.srcObject.getAudioTracks()[0].enabled = true

        const audios = videoRef.current.srcObject.getAudioTracks()[0]

        console.log(audios)
      }
    }
    setMute(!mute)
    
  }

  const toggleCamera = () => {
    // toggle camera on and off here
    console.log("vidoe on tuggled ", !isVideoOn)
    if(videoRef.current){
      if(isVideoOn){
        videoRef.current.srcObject.getVideoTracks()[0].enabled = false

        const video = videoRef.current.srcObject.getAudioTracks()[0]
        console.log(video)


      } else {
        videoRef.current.srcObject.getVideoTracks()[0].enabled = true

        const video = videoRef.current.srcObject.getAudioTracks()[0]

        console.log(video)
      }
    }
    setisVideoOn(!isVideoOn)
  }

  const recordScreen = async () => {
    let stream;
    !userFacing ? (stream = await navigator.mediaDevices.getDisplayMedia(CAPTURE_OPTIONS)) : (stream = await navigator.mediaDevices.getUserMedia(CAPTURE_OPTIONS));
    setMediaStream(stream);

    videoRef.current.srcObject = stream;
    setuserFacing(!userFacing);
  }

  const handleCanPlay = () => {
    videoRef.current.play()
  }

  //!!! authenticate AND loadClient ARE CALLED FIRST
  const authenticate =  () => {
    return window.gapi.auth2
      .getAuthInstance()
      .signIn({ scope: 'openid email profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl' })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log('error in auth')
        console.log(err)
        throw err
      })
  }

  const loadClient = () => {
    // window.gapi.client.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
    window.gapi.client.setApiKey("AIzaSyA3Ae0F03F3j4n_O9kfi7tDII4Q9A3ZNFE")

    
    return window.gapi.client
      .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
      .then((res) => {
        console.log('window.gapi client loaded for API')
        console.log(res)
      })
      .catch((err) => console.log('Error loading window.gapi client for API', err))
  }

  //!!! createBroadcast IS CALLED SECOND. BROADCAST APPEARS ON YOUTUBE
  const createBroadcast =  () => {

    return new Promise(async (resolve, reject) => {
      await window.gapi.client.youtube.liveBroadcasts
              .insert({
              part: ['id,snippet,contentDetails,status'],
              resource: {
                snippet: {
                  title: streamDetails[0],
                  scheduledStartTime: `${new Date().toISOString()}`,
                  description: streamDetails[0],
                },
                contentDetails: {
                  recordFromStart: true,
                  // startWithSlate: true,
                  enableAutoStart: false,
                  monitorStream: {
                    enableMonitorStream: false,
                  },
                },
                status: {
                  privacyStatus: 'public',
                  selfDeclaredMadeForKids: true,
                },
              },
            })
      .then((res) => {
        console.log('Response', res)
        console.log('Broadcast ID : ', res.result.id)
        // setbroadcastId(res.result.id)
        resolve(res.result.id)
      })
      .catch((err) => {
      err.cutomMessage = "Error in createBroadcast"

        console.error('Execute error', err)
        reject(err)
      })


    })
    
  }

  //!!! CALL createStream AFTER createBroadcast. IN THE RESPONSE SET youtubeIngestionUrl AND youtubeStreamName
  const createStream = () => {
    return new Promise(async (resolve, reject)=>{
      await window.gapi.client.youtube.liveStreams
      .insert({
        part: ['snippet,cdn,contentDetails,status'],
        resource: {
          snippet: {
            title: streamDetails[0],
            description: streamDetails[0]
          },
          cdn: {
            frameRate: 'variable',
            ingestionType: 'rtmp',
            resolution: 'variable',
            format: '',
          },
          contentDetails: {
            isReusable: true,
          },
        },
      })
      .then((res) => {
        console.log('Response : ', res)

        setstreamId(res.result.id)
        console.log('streamID : ' + res.result.id)

        setYoutubeIngestionUrl(res.result.cdn.ingestionInfo.ingestionAddress)
        console.log(res.result.cdn.ingestionInfo.ingestionAddress)

        setYoutubeStreamName(res.result.cdn.ingestionInfo.streamName)
        console.log(res.result.cdn.ingestionInfo.streamName)
        resolve([res.result.cdn.ingestionInfo.ingestionAddress + '/' + res.result.cdn.ingestionInfo.streamName, res.result.id])
      })
      .catch((err) => {
      err.cutomMessage = "Error in createStream"

        console.log('Execute error', err)
        reject(err)
      })

    })
    
  }

  //!!! CALL AFTER CREATING STREAM.
  const bindBroadcastToStream = (broadcastIDs, streamIDs) => {
    console.log(broadcastIDs)
    return window.gapi.client.youtube.liveBroadcasts
      .bind({
        part: ['id,snippet,contentDetails,status'],
        id: broadcastIDs,
        streamId: streamIDs,
      })
      .then((res) => {
        console.log('Response', res)
      })
      .catch((err) => {
    err.cutomMessage = "Error in bindBroadcastToStream"

        console.error('Execute error', err)
        throw err
      })
  }

  //!!! CLICK GO LIVE FIRST TO SEND VIDEO TO THE SERVER and then CALL transitionToLive
  const transitionToLive = (broadcastIDs) => {
    return new Promise(async (resovle, reject)=>{
      await window.gapi.client.youtube.liveBroadcasts
      .transition({
        part: ['id,snippet,contentDetails,status'],
        broadcastStatus: 'live',
        id: broadcastIDs,
      })
      .then((res) => {
        // Handle the results here (response.result has the parsed body).
        console.log('Response', res)
        resovle(res)
      })
      .catch(async (err) => {
        err.cutomMessage = "Error in transitionToLive"

        console.log('Execute error', err)
        reject(err)
      })

    })
    
  }

  const transitionToStop= () => {
    return window.gapi.client.youtube.liveBroadcasts
      .transition({
        part: ['id,snippet,contentDetails,status'],
        broadcastStatus: 'complete',
        id: broadcastId,
      })
      .then((res) => {
        // Handle the results here (response.result has the parsed body).
        console.log('Response', res)
      })
      .catch((err) => {
        err.cutomMessage = "Error in transitionToStop"

        console.log('Execute error', err)
        throw err
      })
  }

useEffect(()=>{

  if(window.gapi) {
    window.gapi.load('client:auth2', function () {
      window.gapi.auth2.init({
        // client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        client_id: "750637712158-869f297h0ahp7e0p1jcd32g1hr9dstk7.apps.googleusercontent.com",
        scope: 'openid email profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl',
        plugin_name:'Video Streaming App'
      })
    })
  } else {
    alert('Error: gapi is not loaded')
  }
  
}, [])
  

  const goLive = async () => {

   
   try{ 

    setLiveStatus('CREATING_BROADCAST')
    const broadcastIDs = await createBroadcast();
    setbroadcastId(broadcastIDs)
    console.log("createBroadcast")
    
    setLiveStatus('CREATING_STREAM')
    const [streamURL, streamID] = await createStream();
    console.log("createStream")
    
    setLiveStatus('STARTING_STREAM')
    await startStream(streamURL);
    console.log("startStream")

    setLiveStatus('STARTING_BINDING_BROADCAST_TO_STREAM')
    await bindBroadcastToStream(broadcastIDs, streamID);
    console.log("bindBroadcastToStream")
  
    setLiveStatus('GOING_LIVE')
    await transitionToLive(broadcastIDs)
    setLiveStatus('LIVE')

    console.log("transitionToLive")

  } catch(err) {
    err.cutomMessage2 = "Error in goLive"

      console.log(err)
      alert(JSON.stringify(err))
      setLiveStatus('NOT_LIVE')
    }
  }
  const completeLive = async () => {

    try {
      setLiveStatus('COMPLETING_LIVE')

      await stopStream();
      console.log("stopStream")
      await transitionToStop()

      setLiveStatus('NOT_LIVE')

      console.log("transitionToStop")
    } catch(err) {
      err.cutomMessage2 = "Error in completeLive"

      console.log(err)
      alert(JSON.stringify(err))
      setLiveStatus('LIVE')
    }
  }

const connectYoutube = async () => {
  setYouTubeConnectionStatus("CONNECTING")
  try{
    await authenticate().then(loadClient)
    setYouTubeConnectionStatus("CONNECTED")
    setAnyPlatformConnected(true)
  }
  catch(err) {
    console.log(err)
    err.cutomMessage = "Error in connectYoutube"

    alert(JSON.stringify(err))
    setYouTubeConnectionStatus("NOT_CONNECTED")
    setAnyPlatformConnected(false)
  }
 
} 

const disconnectYoutube = async ()  => {
  try {
  await gapi.auth2.getAuthInstance().disconnect();
  setYouTubeConnectionStatus("NOT_CONNECTED")
  setAnyPlatformConnected(false)

  } catch (err) {
    err.cutomMessage = "Error in disconnectYoutube"

    console.log(err)
    alert(JSON.stringify(err))
    setYouTubeConnectionStatus("CONNECTED")
    setAnyPlatformConnected(true)
  }
}


  return (
    <>
      <div className="container">
      <div className='row'>
        <div className='col-sm-8'>
          <div className='row'>
            <div className='col-sm-8'>
              <h4 className='float-left'>{streamDetails[0]}</h4>
            </div>
            <div className='col-sm-4'>
            <GoLiveButton status={liveStatus} fxGoLive={goLive} fxCompleteLive={completeLive}  disabled={!anyPlatformConnected}/>   
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='row'>
                <div className="stream-preview my-2 text-center container">
                  <video
                    className='stream-preview'
                    ref={videoRef}
                    onCanPlay={handleCanPlay}
                    autoPlay
                    playsInline
                    muted={mute}
                  />
                </div>

              </div>

              <div className='row my-2 text-center container'>
                <div className='col'>
                    <MuteButton audioOn={!mute} fx={toggleMute} />
                    
                    <VideoButton videoOn={isVideoOn} fx={toggleCamera} />
                    
                    <button type="button" className="btn btn-secondary round-btn mx-2 p-2" onClick={getMediaConstraints}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                        </svg>
                    </button>
                </div>
              </div>

            </div>
          </div>
          <div className='row'>
                <div className="studio-camera-preview m-1 container">
                <Webcam className="studio-camera-preview" 
                    audio={false} 
                    height={720}
                    width={1280}
                    imageSmoothing={true} 
                />
                </div>
          </div>
        </div>
        <div className='col-sm-4'>
          <div className="card h-100 studio-platform">
            <div className="card-header">
              <h5 className="card-title">Channels</h5>
            </div>
            <div className="card-body">
              
              <div className='row my-4 mx-2'>
                <div className='col-sm-6'>
                <Image
                  alt="YouTube"
                  src={youtube}
                  layout="responsive"
                  // width={"10em"}
                  // height={"10em"}
                />
                </div>
                <div className='col-sm-6'>
                <PlatformConnectionButton status={youTubeConnectionStatus} connect={connectYoutube} disconnect={disconnectYoutube} disabled={false} />
                </div>
              </div>

              <div className='row my-4 mx-2'>
                <div className='col-sm-6'>
                <Image
                  alt="Facebook"
                  src={facebook}
                  layout="responsive"
                  // width={"10em"}
                  // height={"10em"}
                />
                </div>
                <div className='col-sm-6'>
                <PlatformConnectionButton status={"NOT_CONNECTED"} connect={()=>{}} disconnect={()=>{}} disabled={true} />

                </div>
              </div>

              <div className='row my-4 mx-2'>
                <div className='col-sm-6'>
                <Image
                  alt="Twitch"
                  src={twitch}
                  layout="responsive"
                  // width={"10em"}
                  // height={"10em"}
                />
                </div>
                <div className='col-sm-6'>
                 <PlatformConnectionButton status={"NOT_CONNECTED"} connect={()=>{}} disconnect={()=>{}} disabled={true} />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
      </div>







   
          {/* 
   
          <button onClick={() => {authenticate().then(loadClient)} }>
            1. authenticate
          </button>
          <button onClick={goLive}> Go Live </button>
          <button onClick={completeLive}>Stop Live</button>  */}

    </>
  )
}