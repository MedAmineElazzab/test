import { WhatsappIcon } from "@/components";
import { FullPathWithCurrentDomain } from "@/lib";
import { useRouter } from "next/router";
import { WhatsappShareButton } from "react-share";

interface WhatsAppButtonProps {
  text: string;
}
export function WhatsAppShareButton(props: WhatsAppButtonProps) {
  const { asPath } = useRouter();
  return (
      <WhatsappShareButton
        url={FullPathWithCurrentDomain(asPath)}
        title={props.text}
        windowHeight={800}
        windowWidth={800}
      >
        <WhatsappIcon className="w-6 h-6" />
      </WhatsappShareButton>
  );
}
