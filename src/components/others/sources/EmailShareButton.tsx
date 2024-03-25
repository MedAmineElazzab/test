import { Anchor, EmailIcon } from "@/components";
interface EmailShareButtonProps {
  email: string;
}
export function EmailShareButton(props: EmailShareButtonProps) {
  return (
    <Anchor target="_blank" href={`mailto:${props.email}`}>
      <EmailIcon className="w-6 h-6 text-primary-normal" />
    </Anchor>
  );
}
