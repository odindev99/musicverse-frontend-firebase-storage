import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.value = action.payload;
		},
		updateUser: (state, action) => {
      const update = action.payload;
			state.value = { ...state.value, ...update  };
		},
	},
});

export const { setUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
