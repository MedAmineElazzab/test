import { ErrorIcon, InfosIcon, SuccessIcon, WarningIcon } from "@/components";
import { NotificationProps, notifications } from "@mantine/notifications";
const AutoClose = 3000;
const showNotification = (notification: NotificationProps) => {
  return notifications.show({
    ...notification,
    styles: (theme) => ({
      root: {
        padding: "24px",
        background: "white",
        "&::before": { backgroundColor: theme.white },
        alignItems: "flex-start",
        boxShadow: " 0px 12px 16px -4px #10182814",
      },
      title: {
        color: notification.color,
        fontWeight: 600,
        fontSize: "16px",
        textTransform: "uppercase",
      },
      description: { color: "#667085", fontSize: "14px", lineHeight: "24px" },
      closeButton: {
        color: "#98A2B3",
        border: "2px solid #98A2B3",
        borderRadius: "50%",
        svg: {
          width: "14px !important",
          height: "14px !important",
        },
        "&:hover": { backgroundColor: "#98A2B320" },
      },
      icon: {
        width: 47,
        height: 47,
        svg: {
          width: 47,
          height: 47,
        },
      },
    }),
  });
};

export const SuccessNotification = (props: NotificationProps) => {
  return showNotification({
    title: "Succès",
    color: "#039855",
    icon: <SuccessIcon />,
    autoClose: AutoClose,
    ...props,
  });
};

export const ErrorNotification = (props: NotificationProps) => {
  return showNotification({
    title: "Erreur",
    color: "#D92D20",
    icon: <ErrorIcon />,
    autoClose: AutoClose,
    ...props,
  });
};

export const WarningNotification = (props: NotificationProps) => {
  return showNotification({
    title: "Alerte",
    color: "#DC6803",
    icon: <WarningIcon />,
    autoClose: AutoClose,
    ...props,
  });
};

export const InfoNotification = (props: NotificationProps) => {
  return showNotification({
    title: "Information",
    color: "#0042CC",
    icon: <InfosIcon />,
    autoClose: AutoClose,
    ...props,
  });
};
  