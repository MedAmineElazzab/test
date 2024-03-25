import { LinkedinIcon } from "@/components";
import { FullPathWithCurrentDomain } from "@/lib";
import { useRouter } from "next/router";
import { LinkedinShareButton } from "react-share";

interface LinkendinShareButtonProps {
  title: string;
  description?: string;
}
export function LinkendinShareButton(props: LinkendinShareButtonProps) {
  const { asPath } = useRouter();

  return (
      <LinkedinShareButton
        url={FullPathWithCurrentDomain(asPath)}
        title={props.title}
        source={FullPathWithCurrentDomain(asPath)}
        windowHeight={800}
        windowWidth={800}
        summary={props.description}
      >
        <LinkedinIcon className="w-6 h-6" />
      </LinkedinShareButton>
  );
}
