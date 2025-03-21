import { useState, useEffect } from 'react';
import { AvailabilitySlot } from '../types/provider.types';
import { fetchProviderAvailability, updateProviderSchedule } from '../services/providerService';

export const useProviderAvailability = () => {
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAvailability = async () => {
      setLoading(true);
      try {
        const data = await fetchProviderAvailability();
        setAvailability(data);
      } catch (err) {
        setError('Failed to load availability');
      }
      setLoading(false);
    };

    loadAvailability();
  }, []);

  const updateAvailability = async (newSlot: AvailabilitySlot) => {
    setLoading(true);  
    try {
      const updatedAvailability = await updateProviderSchedule(newSlot);
      setAvailability(updatedAvailability);
    } catch (err) {
      setError('Failed to update availability');
    }
    setLoading(false);
  };

  return { availability, loading, error, updateAvailability };
}; 
