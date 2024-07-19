import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
} from "@reduxjs/toolkit";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResult {
  body: {
    token: string;
  };
}

interface UserProfile {
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface AuthenticationState {
  userToken: string | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthenticationState = {
  userToken: null,
  userProfile: null,
  isLoading: false,
  error: null,
};

export interface NewUserInfos {
  firstName: string;
  lastName: string;
}

export const login: AsyncThunk<LoginResult, LoginCredentials, any> = // eslint-disable-line @typescript-eslint/no-explicit-any
  createAsyncThunk(
    "authentication/login",
    async (credentials: LoginCredentials, { rejectWithValue }) => {
      // console.log(JSON.stringify(credentials));
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to login");
        }
        const data = await response.json();
        return data;
      } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        return rejectWithValue(error.message);
      }
    }
  );

export const getProfile: AsyncThunk<UserProfile, void, any> = createAsyncThunk( // eslint-disable-line @typescript-eslint/no-explicit-any
  "authentication/getProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return rejectWithValue("No token found");
    }
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await response.json();
      return data.body;
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile: AsyncThunk<UserProfile, NewUserInfos, any> = // eslint-disable-line @typescript-eslint/no-explicit-any
  createAsyncThunk(
    "authentication/updateProfile",
    async (newUserInfos: NewUserInfos, { rejectWithValue }) => {
      // console.log("updateProfile function");
      // console.log(newUserInfos);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return rejectWithValue("No token found");
      }
      try {
        const response = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserInfos),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to modify user");
        }
        const data = await response.json();
        // console.log(data.body);
        return data.body;
      } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        return rejectWithValue(error.message);
      }
    }
  );

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout(state) {
      state.userToken = null;
      state.userProfile = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResult>) => {
        state.isLoading = false;
        state.userToken = action.payload.body.token;
        localStorage.setItem("accessToken", state.userToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.userToken = null;
        state.error = action.payload as string;
      })
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.isLoading = false;
        state.userProfile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.userProfile = null;
        state.error = action.payload as string;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.isLoading = false;
        // console.log(action);
        state.userProfile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authenticationSlice.actions;
export default authenticationSlice;
