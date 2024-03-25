import { REFRESH_TOKEN, TOKEN } from "@/common/constants";
import {
  ActivityFeedIcon,
  CertificatIcon,
  CongresIcon,
  DashboardAside,
  DashboardHeader,
  LogoutIcon,
  MasterClassIcon,
  MedicationIcon,
  ModuleIcon,
  NoteIcon,
  ScrollTop,
  SerieIcon,
  SettingsIcon,
  SimulationsIcon,
  SupportIcon,
  UserIcon,
  scrollToTop,
} from "@/components";
import { MENU_ITEMS, ModulesPathnames, ModulesTitles } from "@/enum";
import { deleteCookie } from "cookies-next";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { asPath } = useRouter();
  const logout = () => {
    deleteCookie(TOKEN);
    deleteCookie(REFRESH_TOKEN);
    signOut();
  };
  const MenuAsideItems = [
    {
      href: ModulesPathnames.NOTE,
      name: ModulesTitles.NOTES,
      icon: <NoteIcon />,
    },
    {
      href: ModulesPathnames.SERIE,
      name: ModulesTitles.SERIES,
      icon: <SerieIcon />,
    },
    {
      href: ModulesPathnames.MODULE,
      name: ModulesTitles.MODULES,
      icon: <ModuleIcon />,
    },
    {
      href: ModulesPathnames.CERTIFICAT,
      name: ModulesTitles.CERTIFICAT,
      icon: <CertificatIcon />,
    },
    {
      href: ModulesPathnames.MASTERCLASS,
      name: ModulesTitles.MASTERCLASS,
      icon: <MasterClassIcon />,
    },
    {
      href: ModulesPathnames.CONGRES,
      name: ModulesTitles.CONGRES,
      icon: <CongresIcon />,
    },
    {
      href: ModulesPathnames.MEDICATION,
      name: ModulesTitles.MEDICATION,
      icon: <MedicationIcon />,
    },
    {
      href: ModulesPathnames.SIMULATION,
      name: ModulesTitles.SIMULATION,
      icon: <SimulationsIcon />,
    },
  ];

  const AccountMenuItems = [
    [
      { name: MENU_ITEMS.PROFILE_VIEW, icon: <UserIcon />, href: "#" },
      { name: MENU_ITEMS.SETTINGS, icon: <SettingsIcon />, href: "#" },
    ],
    [
      { name: MENU_ITEMS.FEED, icon: <ActivityFeedIcon />, href: "#" },
      { name: MENU_ITEMS.SUPPORT, icon: <SupportIcon />, href: "#" },
    ],
    [{ name: MENU_ITEMS.LOGOUT, icon: <LogoutIcon />, action: logout }],
  ];

  useEffect(() => {
    scrollToTop();
  }, [asPath]);

  return (
    <main className="flex items-center justify-between h-screen">
      <DashboardAside data={MenuAsideItems} />
      <div className="relative h-full flex flex-col w-dashboard bg-gray-100">
        <DashboardHeader data={AccountMenuItems} />
        <div className="relative scrollable-area-dashboard h-dashboard w-full overflow-y-auto">
          {children}
        </div>
        <ScrollTop />
      </div>
    </main>
  );
}
