import { notifications } from "@mantine/notifications";
import React from "react";
import { ErrorIcon, InfoIcon, SuccessIcon, WarnIcon } from "./icons";
import {
  errorStyle,
  infoStyle,
  successStyle,
  warnStyle,
  darkStyle,
  lightStyle,
} from "./styles";

const useAlerts = () => {
  const setStyles = (key: string) => {
    switch (key) {
      case "LIGHT":
        return lightStyle;

      case "DARK":
        return darkStyle;

      case "SUCCESS":
        return successStyle;

      case "ERROR":
        return errorStyle;

      case "WARN":
        return warnStyle;

      case "INFO":
        return infoStyle;
    }
  };

  const setIcons = (key: string) => {
    switch (key) {
      case "SUCCESS":
        return <SuccessIcon width={20} height={20} color="currentColor" />;

      case "ERROR":
        return <ErrorIcon width={20} height={20} color="currentColor" />;

      case "WARN":
        return <WarnIcon width={20} height={20} color="currentColor" />;

      case "INFO":
        return <InfoIcon width={20} height={20} color="currentColor" />;
    }
  };

  const setIconsWithBorder = (key: string) => {
    switch (key) {
      case "SUCCESS":
        return (
          <div className="absolute top-[0] right-[0] w-[100%] h-[100%] flex justify-center items-center text-[#039855] !bg-[#d1fadf] border-[#ecfdf3] border-[8px] rounded-full shadow-lg shadow-[#039855]/20">
            <SuccessIcon width={20} height={20} color="currentColor" />
          </div>
        );

      case "ERROR":
        return (
          <div className="absolute top-[0] right-[0] w-[100%] h-[100%] flex justify-center items-center text-[#D92D20] !bg-[#FEE4E2] border-[#FEF3F2] border-[8px] rounded-full shadow-lg shadow-[#D92D20]/20">
            <ErrorIcon width={20} height={20} color="currentColor" />
          </div>
        );

      case "WARN":
        return (
          <div className="absolute top-[0] right-[0] w-[100%] h-[100%] flex justify-center items-center text-[#FF9800] !bg-[#FBC482] border-[#F8D38E] border-[8px] rounded-full shadow-lg shadow-[#d1fadf]/20">
            <WarnIcon width={20} height={20} color="currentColor" />
          </div>
        );

      case "INFO":
        return (
          <div className="absolute top-[0] right-[0] w-[100%] h-[100%] flex justify-center items-center text-[#2196F3] !bg-[#D9EAF7] border-[#E3F2FD] border-[8px] rounded-full shadow-lg shadow-[#d1fadf]/20">
            <InfoIcon width={20} height={20} color="currentColor" />
          </div>
        );
    }
  };

  const onAlert = (
    title: string,
    content: string,
    status: "SUCCESS" | "ERROR" | "WARN" | "INFO",
    timeout: number = 5000
  ) => {
    notifications.show({
      id: `${new Date()}`,
      title: <span className="font-bold">{title}</span>,
      message: <span>{content}</span>,
      icon: setIcons(status),
      autoClose: timeout,
      classNames: setStyles(status),
    });
  };

  const onThemeAlert = (
    title: string,
    content: string,
    status: "SUCCESS" | "ERROR" | "WARN" | "INFO",
    theme: "DARK" | "LIGHT",
    timeout: number = 5000
  ) => {
    notifications.show({
      id: `${new Date()}`,
      title: <span className="font-bold">{title}</span>,
      message: <span>{content}</span>,
      icon: setIconsWithBorder(status),
      autoClose: timeout,
      classNames: setStyles(theme),
    });
  };

  return { onAlert, onThemeAlert };
};

export default useAlerts;
