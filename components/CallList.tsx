// @ts-nocheck

'use client'

import { useGetCalls } from "@/hooks/useGetCalls"
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import MeetingCard from "./MeetingCard";


const CallList = ({type}:{type:'ended'|'upcoming'|'recordings'}) => {
    const {endedCalls, upcomingCalls, callRecordings, isLoading} = useGetCalls();
    const router = useRouter();

    const getCalls = () =>{
        switch(type){
            case 'ended':
                return endedCalls;
            case 'recordings':
                return callRecordings;
            case 'upcoming':
                return upcomingCalls;
            default:
                return [];
        }
    }

    const getNoCallsMessage = () =>{
        switch(type){
            case 'ended':
                return "No previous calls";
            case 'recordings':
                return "No previous recordings";
            case 'upcoming':
                return "No upcoming calls";
            default:
                return '';
        }
    }

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {calls && calls.length > 0 ? calls.map((meeting:Call | CallRecording)=>(
            <MeetingCard 
            key={(meeting as Call).id}
            icon={
                type === 'ended'?
                     '/icons/previous.svg':
                        type === 'upcoming' ?
                            '/icons/upcoming.svg' :
                            '/icons/recordings.svg'
            }
            title={(meeting as Call).state.custom.description.substring(0,20) || 'No description'}
            date={meeting.state.startedAt?.toLocaleString() || meeting.start_time.toLocaleString()}
            isPreviousMeeting={type==='ended'}
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined }
            buttonText=''
            handleClick=''
            link=''
            buttonText=''
            />
        )):(
            <h1>{noCallsMessage}</h1>
        )}
    </div>
  )
}

export default CallList