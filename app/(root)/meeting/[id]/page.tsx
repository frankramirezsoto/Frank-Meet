"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  //To confirm if the user has loaded from Clerk
  const { isLoaded } = useUser();
  //Custom hook at the hooks folder, used to retrieve a call by its id
  const { call, isCallLoading } = useGetCallById(id);
  //State to confirm is user has setup their webcam & mic
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  //If the user has not been loaded it will load
  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      {/* Stream Call Component: https://getstream.io/video/docs/react/ui-components/core/stream-call/ */}
      <StreamCall call={call}>
        {/* Stream theme defined at globals.css */}
        <StreamTheme>
          {/* If setup is complete then it will access the Meeting Room, else setup needs to be completed */}
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
