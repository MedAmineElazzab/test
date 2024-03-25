import { City, EducationLevel, Environment, Institution, Section } from "@/api";
import { TitleName } from "@/enum";
import {
  LoaderProps,
  MantineColor,
  MantineGradient,
  MantineNumberSize,
  MantineSize,
  Variants,
} from "@mantine/core";

export interface CustomButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  size?: MantineSize;
  type?: "submit" | "button" | "reset";
  color?: MantineColor;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  radius?: MantineNumberSize;
  variant?: Variants<
    "filled" | "outline" | "light" | "white" | "default" | "subtle" | "gradient"
  >;
  gradient?: MantineGradient;
  uppercase?: boolean;
  compact?: boolean;
  loading?: boolean;
  loaderProps?: LoaderProps;
  loaderPosition?: "left" | "right" | "center";
  children?: React.ReactNode;
  disabled?: boolean;
}
export interface User {
  id: number;
  email: string;
  phoneNumber: string;
  password: string;
  gender: string;
  firstName: string;
  lastName: string;
  yearOfExercise: string | null;
  registrationNumber: number | null;
  professionId: number | null;
  institutionId: number | null;
  cityId: number | null;
  organizationId: number;
  educationLevelId: number | null;
  environmentId: number | null;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  canBrowse: boolean;
  currentStep: number;
}
export interface UserPatched {
  id?: number;
  email?: string;
  phoneNumber?: string;
  password?: string;
  gender?: string;
  firstName?: string;
  lastName?: string;
  yearOfExercise?: string | null;
  registrationNumber?: number | null;
  professionId?: number | null;
  institutionId?: number | null;
  cityId?: number | null;
  organizationId?: number;
  educationLevelId?: number | null;
  environmentId?: number | null;
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
  canBrowse?: boolean;
  currentStep?: number;
  city?: City;
  profession?: City;
  institution?: Institution;
  educationLevel?: EducationLevel;
  environment?: Environment;
  sectionIds?: number[];
  UserSections?: {
    userId: number;
    sectionId: number;
    section: Section;
  }[];
}
export type PaginationProps = {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type Meta = {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export type ViewStates = (string & "seen") | "completed" | "notStarted";

export type SelectOption = {
  value: string;
  label: string;
};

export type UserTypes = "STUDENT" | "EXPERT";

export type Steps =
  | "SIGNUP"
  | "INFORMATION"
  | "INTERESTS"
  | "VERIFICATION"
  | "DONE";

export type langs = "fr" | "en";
export type MenuItem = {
  name: string;
  icon?: ReactNode;
  href?: string;
  action?: () => void;
};

export type accountUser = {
  firstName: string;
  lastName: string;
  professionName: string;
  imagePath: string;
  titleName: TitleName;
};

export type eventType = {
  id: number;
  name: string;
  description: string;
};

export type CalendarTypes = "GOOGLE" | "APPLE" | "OUTLOOK" | "YAHOO";
export type CalendarEvent = {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
};

export type counterType = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
