export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';


export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface AvailabilitySlot {
  day: WeekDay;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
}

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  availability: AvailabilitySlot[];
  maxPatientsPerDay: number;
  timezone: string;
}


export type ProviderSchedule = {
  [key in WeekDay]: TimeSlot[];
}; 

