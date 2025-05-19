type UserEventType = "navigation" | "filter";

interface UserEvent {
  type: UserEventType;
  timestamp: number;
  value: Record<string, unknown>;
}

export type UserEvents = UserEvent[];
