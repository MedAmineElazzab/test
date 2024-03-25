import { MenuItem, accountUser } from "@/@types";
import { User } from "@/api/user";
import { MENUDURATION } from "@/common/constants";
import {
  Button,
  DashboardMenuTarget,
  Indicator,
  InfoIconRounded,
  Input,
  LoopSearchIcon,
  Menu,
  MenuIcon,
  MenuLangsSwitcher,
  NotificationIcon,
  SparkIcon,
} from "@/components";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface DashboardHeaderProps {
  data: MenuItem[][];
}
interface AccountMenuProps {
  menuOpened: boolean;
  setMenuOpened: Dispatch<SetStateAction<boolean>>;
  user: accountUser;
  data: MenuItem[][];
}

const AccountMenu = ({
  menuOpened,
  setMenuOpened,
  data,
  user,
}: AccountMenuProps) => (
  <div className="relative w-220">
    <Menu
      opened={menuOpened}
      onChange={setMenuOpened}
      transitionProps={{ transition: "pop", duration: MENUDURATION }}
      width={"100%"}
      label="Menu du compte"
      items={data}
      closeOnEscape
      position="bottom"
      target={<DashboardMenuTarget user={user} opened={menuOpened} />}
    />
  </div>
);

const NotificationsMenu = () => (
  <div className="flex items-center flex-row-reverse gap-4">
    <Indicator label="5" withBorder color="red">
      <NotificationIcon />
    </Indicator>
    <MenuIcon />
    <InfoIconRounded />
  </div>
);

export function DashboardHeader(props: DashboardHeaderProps) {
  const { user } = useSelector((state: { user: { user: User } }) => state.user);
  const [accountUser, setAccountUser] = useState<accountUser | null>(null);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setAccountUser({ ...user, professionName: user.profession.name });
    }
  }, [user]);

  return (
    <div className="header-dashboard h-19 select-none px-6 w-full flex justify-between items-center bg-white border-b border-gray-200">
      <div>
        <Input
          icon={<LoopSearchIcon className="w-5 h-5" />}
          placeholder="Recherche globale..."
          size="md"
        />
      </div>
      <div className="flex items-center gap-6 flex-row-reverse">
        {accountUser && (
          <AccountMenu
            menuOpened={menuOpened}
            setMenuOpened={setMenuOpened}
            user={accountUser}
            data={props.data}
          />
        )}
        <div className="text-gray-500 flex gap-6 flex-row-reverse items-center">
          <NotificationsMenu />
          <MenuLangsSwitcher />
        </div>
        <div>
          <Button color="yellow" variant="filled" leftIcon={<SparkIcon />}>
            Débloquez toutes les fonctionnalités
          </Button>
        </div>
      </div>
    </div>
  );
}
