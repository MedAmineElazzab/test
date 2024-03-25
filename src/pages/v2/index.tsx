import { User } from "@/api/user";
import { TitleAbbreviation } from "@/enum";
import { useSelector } from "react-redux";

export default function Index() {
  const { user } = useSelector((state: { user: { user: User } }) => state.user);
  if (user) {
    return (
      <div className="m-4">
        Bienvenue {user.titleName && TitleAbbreviation[user.titleName]}
        {user.firstName + " " + user.lastName}
      </div>
    );
  }
  return null;
}
