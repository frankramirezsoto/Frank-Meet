'use client';

import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

const MeetingSetup = ({
    setIsSetupComplete,
  }: {
    setIsSetupComplete: (value: boolean) => void;
  }) => {

    const { useCallEndedAt, useCallStartsAt, useMicrophoneState, useCameraState } = useCallStateHooks();
    const { camera, isMute } = useCameraState();
    

  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();
  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);
  useEffect(() => {
    call.camera.toggle();
    call.microphone.toggle();
    // Disable camera access
    
  }, [isMicCamToggled, call.camera, call.microphone]);

  function stopBothVideoAndAudio(stream: MediaStream): void {
    stream.getTracks().forEach((track) => {
      if (track.readyState === 'live') {
        track.stop();
      }
    });
  }


  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <button onClick={async () =>{// Example usage:
  const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
  stopBothVideoAndAudio(cameraStream);}}>disable</button>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();

          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  )
}

export default MeetingSetup