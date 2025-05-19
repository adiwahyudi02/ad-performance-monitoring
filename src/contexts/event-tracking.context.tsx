"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getItem, setItem } from "@/utils/localstorage.utils";
import { LOCALSTORAGE_KEY } from "@/constants/localstorage.constans";
import { UserEvent, UserEvents } from "@/types/event-tracking";

interface EventTrackingContextType {
  userEvents: UserEvents;
  addEventTracking: (event: UserEvent) => void;
}

const MAX_EVENTS = 200;

const EventTrackingContext = createContext<
  EventTrackingContextType | undefined
>(undefined);

export const EventTrackingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userEvents, setUserEvents] = useState<UserEvents>([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserEvents = getItem<UserEvents>(
        LOCALSTORAGE_KEY.USER_EVENTS
      );
      if (storedUserEvents) {
        const sortedEvents = [...storedUserEvents].sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setUserEvents(sortedEvents);
      }
    }
  }, []);

  const addEventTracking = (event: UserEvent) => {
    const updatedEvents = [...userEvents, event]
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, MAX_EVENTS); // Ensure max 200 items

    setUserEvents(updatedEvents);
    setItem(LOCALSTORAGE_KEY.USER_EVENTS, updatedEvents);
  };

  return (
    <EventTrackingContext.Provider value={{ userEvents, addEventTracking }}>
      {children}
    </EventTrackingContext.Provider>
  );
};

export const useEventTrackingContext = () => {
  const context = useContext(EventTrackingContext);
  if (!context) {
    throw new Error(
      "useEventTrackingContext must be used within an EventTrackingProvider"
    );
  }
  return context;
};
