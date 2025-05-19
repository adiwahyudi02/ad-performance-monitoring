"use client";

import { useEffect, useRef } from "react";
import { useEventTrackingContext } from "@/contexts/event-tracking.context";
import { usePathname } from "next/navigation";

export const NavigationTracker = () => {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const { addEventTracking } = useEventTrackingContext();

  useEffect(() => {
    if (prevPath.current !== null && prevPath.current !== pathname) {
      addEventTracking({
        type: "navigation",
        timestamp: Date.now(),
        value: {
          from: prevPath.current,
          to: pathname,
        },
      });
    }

    prevPath.current = pathname;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null; // no UI
};
