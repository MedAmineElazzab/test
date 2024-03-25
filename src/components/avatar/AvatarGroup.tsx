import {
    Avatar as AvatarMantine,
} from "@mantine/core";
import { AvatarGroupProps as AvatarGroupMantineProps } from "@mantine/core/lib/Avatar/AvatarGroup/AvatarGroup";
interface AvatarGroupProps extends AvatarGroupMantineProps {
}
export function AvatarGroup({
  ...props
}: AvatarGroupProps & React.ComponentPropsWithoutRef<"div">) {
 

  return (
    <div className="relative Avatar-wrap w-fit">
      <AvatarMantine.Group
        {...props}
        
      >
        {props.children}
      </AvatarMantine.Group>
      
    </div>
  );
}