import { UserPatched } from "@/@types";
import { User } from "@/api/user";
import { Pages } from "../../enum";
import { api } from "@/api";

interface LoginProps {
  email: string;
  password: string;
}
interface RegisterProps {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumber: string;
  password: string;
  activationCode: string;
  googleTokenId?: string;
  linkedinTokenId?: string;
}
export async function Login({ email, password }: LoginProps) {
  try {
    const { data } = await api.post<{ accessToken: string; userId: number }>(
      Pages.login_URL
    );
    // http://192.168.10.12:8050/auth/signin
    return { userId: data.userId, token: data.accessToken };
  } catch (error) {
    console.log(error);
    return { userId: null, token: null };
  }
}

export async function Register(user: RegisterProps) {
  try {
    const { data, status } = await api.post<{
      email: string;
      message: string;
      accessToken: string;
      user: {
        id: number;
        email: string;
        firstName: string;
        isVerified: string;
        lastName: string;
      };
    }>(Pages.Register_URL, { ...user });
    return { ...data, status, error: null };
  } catch (error) {
    return {
      user: null,
      accessToken: null,
      message: null,
      email: null,
      status: null,
      error: error as any,
    };
  }
}

export type Session = {
  user: {
    name: string;
    email: string;
    images: string;
  };
  expires: string;
  access_token?: {
    provider: string;
    type: string;
    providerAccountId: string;
    access_token: string;
    expires_at: number;
    scope: string;
    token_type: string;
    id_token: string;
  };
};

export async function Me() {
  try {
    const { data } = await api.get<User>("/users/me");
    return { data };
  } catch (error) {
    throw error;
  }
}

export async function UpdateUser(
  userId: number,
  data: UserPatched,
  currentStep?: number
) {
  let payload: UserPatched = {};
  payload = { ...data };
  currentStep ? (payload.currentStep = currentStep) : null;
  console.log("payload : ", payload);
  const { data: response } = await api.patch<User>("/users/" + userId, {
    ...payload,
  });
  return response;
}
