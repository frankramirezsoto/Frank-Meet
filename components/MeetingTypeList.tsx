'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import Loader from './Loader';
import { useToast } from './ui/use-toast';
import { Textarea } from './ui/textarea';
import ReactDatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { Input } from './ui/input';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  //Used to redirect
  const router = useRouter();
  //Meeting state could be that we are looking to start an instant meeting, schedule it or joining a meeting
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  //Values are date, description and link 
  const [values, setValues] = useState(initialValues);
  //Using the state of the Call Object 
  const [callDetail, setCallDetail] = useState<Call>();
  //Meeting link
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;
  //We get a video client Stream.io: https://getstream.io/video/docs/react/guides/client-auth/
  const client = useStreamVideoClient();
  //Gets user from Clerk 
  const { user } = useUser();
  //Toast for messages
  const { toast } = useToast();

  //Function to create a meeting 
  const createMeeting = async () => {
    //Return if there's no client and no user 
    if (!client || !user) return;
    try {
      //Returns if there's no date and time of the meeting
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      //Creating the meeting ID
      const id = crypto.randomUUID();
      //Creating call of type 'default' and passing the id: https://getstream.io/video/docs/react/guides/configuring-call-types/
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      //Set call start time & description using the getOrCreate function: https://getstream.io/video/docs/react/guides/joining-and-creating-calls/#call-creation-options 
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      //Setting Call Detail
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',
      });
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  //If there's no video client and no user it will return a loader 
  if (!client || !user) return <Loader />;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      
      {/* ACTIONS */}
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className='bg-gradient-to-r from-orange-700 to-orange-400'
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="via invitation link"
        className="bg-gradient-to-r from-blue-700 to-blue-400"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-gradient-to-r from-purple-700 to-purple-400"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        className="bg-gradient-to-r from-yellow-700 to-yellow-400"
        handleClick={() => router.push('/recordings')}
      />

      {/* MODALS */}

      {/* Scheduling meeting Modal */}
      {/* For scheduling a meeting, if we don't have the call details (time, date, description) we request them, else we have the copy link modal */}
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect 
              showMonthYearDropdown
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}
      
      {/* Instant Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

    {/* Joining Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={() => router.push(values.link)}>
          <Input placeholder='Meeting Link' className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={(e) => setValues({...values, link: e.target.value})}/>
        </MeetingModal>

    </section>
  )
}

export default MeetingTypeList