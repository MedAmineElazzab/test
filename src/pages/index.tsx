import LottieAnimation from "@/_v1/components/Animation/LottieAnimation";
import { Notifications, Profile } from "@/_v1/components/dashboard/home";
import CertificatsAwarded from "@/_v1/components/dashboard/home/CertificatsAwarded";
import EventsCalendar from "@/_v1/components/dashboard/home/EventsCalendar";
import FavouriteModules from "@/_v1/components/dashboard/home/FavouriteModules";
import FavouriteNotes from "@/_v1/components/dashboard/home/FavouriteNotes";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const PlusLottie = require("@public/assets/animations/plus.json");
export default function Home() {
  const { query } = useRouter();
  const { user } = useSelector((state: any) => state.user);
  useEffect(() => {
    if (query?.auth === "b") {
      notifications.show({
        id: "load-data",
        color: "",
        title: (
          <span className="font-bold">
            Welcome back {user?.firstName + " " + user?.lastName} 👋
          </span>
        ),

        message: (
          <span>let&apos;s discover together the new medical techs 💻 </span>
        ),
        icon: <IconCheck className="w-[25px] text-white" />,
        autoClose: 4000,
        styles: {
          icon: {
            width: "2.75rem",
            height: "2.75rem",
          },
        },
      });
    }
  }, [query, user]);
  return (
    <div className="h-auto ">
      <div className="grid grid-cols-4 gap-x-7 mx-[30px] my-8 w1500:grid-cols-3 w1100:grid-cols-2 w800:grid-cols-1 gap-y-7 ">
        <div className="card w-full h-[534px]">
          <Profile user={user} />
        </div>
        <div className="card w-full h-[534px]">
          <Notifications />
        </div>
        <div className="card w-full h-[534px] overflow-hidden">
          <EventsCalendar />
        </div>
        <div className="card w-full h-[534px]">
          <CertificatsAwarded />
        </div>
        <div className="card w-full h-[534px]">
          <FavouriteNotes />
        </div>
        <div className="card w-full h-[534px]">
          <FavouriteModules />
        </div>
        <div className="card w-full h-[534px]">
          <div className="relative bg-[#fff] flex items-center justify-center w-full h-full border rounded-md border-[#E2E8F0]">
            <div className="w-[120px] opacity-25 relative pointer-events-none">
              <LottieAnimation loop animationData={PlusLottie} />
            </div>
          </div>
        </div>
        <div className="card w-full h-[534px] ">
          <div className="relative bg-[#fff] flex items-center justify-center w-full h-full border rounded-md border-[#E2E8F0]">
            <div className="w-[120px] opacity-25 relative pointer-events-none">
              <LottieAnimation loop animationData={PlusLottie} />
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}