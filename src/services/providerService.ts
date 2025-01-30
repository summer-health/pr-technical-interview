import { AvailabilitySlot } from '../types/provider.types';


let mockAvailability: AvailabilitySlot[] = [
  {
    day: 'Monday',
    startTime: '09:00',
    endTime: '17:00',
    isRecurring: true
  }
];


export const fetchProviderAvailability = async (): Promise<AvailabilitySlot[]> => {
  return new Promise(resolve => {
    setTimeout(() => resolve([...mockAvailability]), 500);
  });
};




export const updateProviderSchedule = async (newSlot: AvailabilitySlot): Promise<AvailabilitySlot[]> => {
  return new Promise(resolve => {

    mockAvailability.push(newSlot);  
    setTimeout(() => resolve(mockAvailability), Math.random() * 1000);
  });
}; 