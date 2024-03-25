import {
  Divider,
  EmailShareButton,
  LinkendinShareButton,
  Text,
  WhatsAppShareButton,
} from "@/components";
import { formatDateToCustomString } from "@/lib";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
interface ModuleHeaderBottomSectionProps {
  date: string;
  vues: string | number;
  comments: string | number;
}

export function ModuleHeaderBottomSection(
  props: ModuleHeaderBottomSectionProps
) {
  const parsedDate = parseISO(props.date);

  // Format the date in the desired format
  const formattedDate = format(
    parsedDate,
    "'Publié le' d MMMM yyyy ' - ' HH:mm",
    { locale: fr }
  );

  return (
    <>
      <div className="date text-xs text-gray-500">{formattedDate}</div>
      <Divider color="gray" orientation="vertical" w={2} opacity={0.3} h={15} />
      <Text fz={"xs"} className="views text-gray-500">
        <span className="text-black ">{props.vues}</span> &nbsp;{" "}
        {props.vues == 1 ? "vue" : "vues"}
      </Text>
      <Divider color="gray" orientation="vertical" w={2} opacity={0.3} h={15} />
      <Text fz={"xs"} className="comments text-gray-500">
        <span className="text-black">{props.comments}</span> &nbsp;{" "}
        {props.comments == 1 ? "commentaire" : "commentaires"}
      </Text>
      <Divider color="gray" orientation="vertical" w={2} opacity={0.3} h={15} />
      <Text fz={"xs"} className="text-gray-500 view flex gap-2 items-center">
        Partager :
        <div className="flex items-center gap-2">
          <WhatsAppShareButton text="Meducate | Follow this link 🔗:" />
          <LinkendinShareButton title="Meducate | Follow this link 🔗:" />
          {/* <PdfExportButton /> */}
          <EmailShareButton email="help@meducate.com" />
        </div>
      </Text>
    </>
  );
}
