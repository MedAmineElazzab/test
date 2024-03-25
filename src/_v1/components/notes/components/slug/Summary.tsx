import { ActionIcon, CopyButton, Tooltip, rem } from "@mantine/core";
import { IconCheck, IconCopy } from "@tabler/icons-react";
interface SummaryProps {
  summary: string;
}
export default function Summary({ summary }: SummaryProps) {
  return (
    <div className="summary relative  text-[#1E293B] flex flex-col gap-[16px]   bg-[#F9FAFB]  w-full  p-[32px]  rounded-[4px]">
      <div className="absolute top-0 m-2 right-0">
        <CopyButton value={summary} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "Copied" : "Copy"}
              withArrow
              position="right"
            >
              <ActionIcon
                color={copied ? "teal" : "gray"}
                variant="subtle"
                onClick={copy}
                className="toHide"
              >
                {copied ? (
                  <IconCheck style={{ width: rem(20) }} />
                ) : (
                  <IconCopy style={{ width: rem(20) }} />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </div>
      <h2 className="leading-[20px]  font-[600] text-[#101828] text-[16px] ">Résumé :</h2>
      <div
        className="leading-[24px] text-[16px] font-[400] text-justify text-[#667085]  "
        dangerouslySetInnerHTML={{
          __html: summary,
        }}
      />
    </div>
  );
}
