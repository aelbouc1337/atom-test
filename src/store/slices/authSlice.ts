import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

interface AuthState {
  isAuthenticated: boolean;
  userProfile: {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    inventory: Product[];
  };
}

const initialState: AuthState = {
  isAuthenticated:
    typeof window !== "undefined" && !!localStorage.getItem("token"),
  userProfile: {
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    inventory: [],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    setUserProfile: (
      state,
      action: PayloadAction<AuthState["userProfile"]>
    ) => {
      state.userProfile = action.payload;
    },
    addToInventory: (state, action: PayloadAction<Product[]>) => {
      state.userProfile.inventory.push(...action.payload);
    },
  },
});

export const { login, setUserProfile, addToInventory } = authSlice.actions;
export default authSlice.reducer;
