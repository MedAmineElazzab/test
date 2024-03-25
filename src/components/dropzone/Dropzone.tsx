import UploadIcon from "@/_v1/icons/sources/UploadIcon";
import UploadIconAccespted from "@/_v1/icons/sources/UploadIconAccespted";
import UploadIconRejected from "@/_v1/icons/sources/UploadIconRejected";
import { Group, clsx, rem } from "@mantine/core";
import {
  Dropzone as DropzoneMantine,
  DropzoneProps as DropzonePropsMantine,
} from "@mantine/dropzone";
interface DropzoneProps extends DropzonePropsMantine {
  label?: string;
}
export function Dropzone(props: DropzoneProps) {
  const classNames = clsx(props.className, {
    "opacity-[.5] pointer-events-none bg-gray-200/70": props.disabled == true,
  });
  const labelClassname = clsx("label text-[#101828] font-semibold text-lg", {
    "opacity-[.5]": props.disabled == true,
  });
  return (
    <>
      {props?.label && (
        <div className={labelClassname}>
          {props.label}
        </div>
      )}
      <DropzoneMantine
        styles={{
          root: {
            border: "1px  solid #EAECF0 ! important",
          },
        }}
        className={classNames}
        {...props}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: rem(100), pointerEvents: "none" }}
          className="flex flex-col gap-0 items-center justify-center text-center"
        >
          <DropzoneMantine.Accept>
            <UploadIconAccespted />
          </DropzoneMantine.Accept>
          <DropzoneMantine.Reject>
            <UploadIconRejected />
          </DropzoneMantine.Reject>
          <DropzoneMantine.Idle>
            <UploadIcon className="text-primary-normal" />
          </DropzoneMantine.Idle>

          {props.children}
        </Group>
      </DropzoneMantine>
    </>
  );
}
