import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    appointments: []
};

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState,
    reducers: {
        addAppointment: (state, action) => {
            state.appointments.push(action.payload);
        },
        removeAppointment: (state, action) => {
            state.appointments = state.appointments.filter(
                appointment => appointment.unique_id !== action.payload
            );
        }
    }
});

export const { addAppointment, removeAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
