'use client'

import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from "@/hooks/useGetCalls"
import { useEffect, useState } from 'react';

const HomePage = () => {
  //Gets current date & time 
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);
  //Gets upcoming calls 
  const { upcomingCalls } = useGetCalls();
  const [upcomingDateTime, setUpcomingDateTime] = useState("");

  useEffect(()=>{
    if(upcomingCalls.length > 0) {
      const dateTime = upcomingCalls[0].state.startsAt;
      setUpcomingDateTime(`${(new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(dateTime)} at ${dateTime && dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`);
    }
  },[upcomingDateTime, upcomingCalls])

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      {/* Heading section  */}
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism w-fit rounded p-2 text-center text-base font-normal">
            {upcomingCalls.length > 0  ? `Upcoming call on ${upcomingDateTime}`:'No upcoming calls'}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      {/* Meeting TypeList lists all the actions to perform */}
      <MeetingTypeList />
    </section>
  )
}

export default HomePage;