import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]); //Array of Call Objects that will be retrieved from Streamio
  const [isLoading, setIsLoading] = useState(false); //Handles hook loading state 
  const client = useStreamVideoClient(); //StreamVideoClient from Streamio
  const { user } = useUser(); //User from Clerk
  const now = new Date(); // Current date and time
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000); // 30 minutes ago

  //On Change on the client and the user.id, the hook will then query the client with all calls for the userId
  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;
      setIsLoading(true);

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });
        setCalls(calls);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadCalls();
  }, [client, user?.id]);

  //Return ended calls 
  const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });
  //Return upcoming calls 
  const upcomingCalls = calls.filter(
    ({ state: { startsAt, endedAt } }: Call) => {
      const callStartTime = startsAt ? new Date(startsAt) : null;
      return (
        (callStartTime && callStartTime > now) || // Future calls
        (callStartTime &&
          callStartTime >= thirtyMinutesAgo &&
          callStartTime <= now &&
          !endedAt) //Calls that may have started 30 min ago and have not ended
      );
    }
  );

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isLoading,
  };
};
