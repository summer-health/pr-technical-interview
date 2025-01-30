import React, { useState } from 'react';
import { WeekDay } from '../types/provider.types';
import { useProviderAvailability } from '../hooks/useProviderAvailability';
import {
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  TextField,
  Button,
  Alert,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel
} from '@mui/material';

const WEEK_DAYS: WeekDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const ProviderAvailability = () => {
  const { availability, loading, error, updateAvailability } = useProviderAvailability();
  const [selectedDay, setSelectedDay] = useState<WeekDay>('Monday');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await updateAvailability({
      day: selectedDay,
      startTime,
      endTime,
      isRecurring: true,
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box py={4}>
        <Typography variant="h6" component="h1" gutterBottom align="center">
          Set Provider Availability
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="day-select-label">Day of Week</InputLabel>
              <Select
                labelId="day-select-label"
                value={selectedDay}
                label="Day of Week"
                onChange={(e) => setSelectedDay(e.target.value as WeekDay)}
              >
                {WEEK_DAYS.map(day => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              type="time"
              label="Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />

            <TextField
              type="time"
              label="End Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />

            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
            >
              Add Availability
            </Button>
          </Box>
        </Paper>

        <Paper elevation={2}>
          <List>
            {availability.map((slot, index) => (
              <ListItem 
                key={`${slot.day}-${index}`}
                divider={index !== availability.length - 1}
              >
                <ListItemText
                  primary={slot.day}
                  secondary={`${slot.startTime} - ${slot.endTime}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProviderAvailability; 