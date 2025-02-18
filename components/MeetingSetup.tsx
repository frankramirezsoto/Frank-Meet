"use client";

import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Logo from "./Logo";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  //Getting Hooks from Stream.io
  const {
    useCallEndedAt,
    useCallStartsAt,
  } = useCallStateHooks();

  //Required to determine start and end time of the call
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  //Using the call hook from Stream.io to initiate the call
  const call = useCall();
  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  //Togglers for Mic & Camera
  const [isMicToggled, setIsMicToggled] = useState(false);
  const [isCamToggled, setIsCamToggled] = useState(false);

  useEffect(() => {
    call.camera.toggle();
  }, [isCamToggled]);

  useEffect(() => {
    call.microphone.toggle();
  }, [isMicToggled]);

  return (
    <>
      <div className="absolute ms-5 mt-5 flex justify-start">
        <Logo size={40} className="text-2xl" />
      </div>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
        <h1 className="text-center text-2xl font-bold">Video Setup</h1>

        {/* Video Preview (from Streamio) */}
        <VideoPreview />

        <div className="flex h-16 items-center justify-center gap-3">
          {/* Cam Toggler */}
          <label
            className={`flex items-center justify-center rounded-full w-[2.375rem] h-[2.375rem] cursor-pointer p-2 ${
              isCamToggled
                ? "bg-[#19232d] hover:bg-[#4c535b]"
                : "bg-red-500 hover:bg-red-800"
            }`}
          >
            <input
              type="checkbox"
              checked={isCamToggled}
              onChange={(e) => setIsCamToggled(e.target.checked)}
              className="hidden"
            />
            {isCamToggled ? (
              <Image
                src="../icons/camera-on.svg"
                alt="Camera"
                width={22}
                height={22}
              />
            ) : (
              <Image
                src="../icons/camera-off.svg"
                alt="Camera"
                width={52}
                height={52}
              />
            )}
          </label>

          {/* Mic Toggler */}
          <label
            className={`flex items-center justify-center rounded-full w-[2.375rem] h-[2.375rem] cursor-pointer p-2 ${
              isMicToggled
                ? "bg-[#19232d] hover:bg-[#4c535b]"
                : "bg-red-500 hover:bg-red-800"
            }`}
          >
            <input
              type="checkbox"
              checked={isMicToggled}
              onChange={(e) => setIsMicToggled(e.target.checked)}
              className="hidden"
            />
            {isMicToggled ? (
              <Image
                src="../icons/microphone-on.svg"
                alt="Microphone On"
                width={22}
                height={22}
              />
            ) : (
              <Image
                src="../icons/microphone-off.svg"
                alt="Microphone Off"
                width={52}
                height={52}
              />
            )}
          </label>
          {/* Settings (from Streamio) */}
          <DeviceSettings />
        </div>

        {/* Join Meeting Button */}
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
    </>
  );
};

export default MeetingSetup;
