import { EventTrackingTable } from "@/components/pages/event-tracking/event-tracking-table";
import { TitlePage } from "@/components/ui/title-page";

export default function EventTrackingPage() {
  return (
    <>
      <TitlePage>Event Tracking</TitlePage>
      <EventTrackingTable />
    </>
  );
}
