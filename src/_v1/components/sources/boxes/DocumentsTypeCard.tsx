import {
  AUDIOICON,
  EXCELICON,
  IMAGEICON,
  MP4ICON,
  OTHERICON,
  PDFICON,
  POWERPOINTICON,
  WORDICON,
} from "@/_v1/icons/sources/fileTypes";

const DocumentsTypesCard = ({ type }: { type: string }) => {
  switch (type) {
    case "IMAGE":
      return <IMAGEICON className="w-[40px] h-[40px]" />;
    case "VIDEO":
      return <MP4ICON className="w-[40px] h-[40px]" />;
    case "AUDIO":
      return <AUDIOICON className="w-[40px] h-[40px]" />;
    case "PDF":
      return <PDFICON className="w-[40px] h-[40px]" />;
    case "WORD":
      return <WORDICON className="w-[40px] h-[40px]" />;
    case "EXCEL":
      return <EXCELICON className="w-[40px] h-[40px]" />;
    case "POWERPOINT":
      return <POWERPOINTICON className="w-[40px] h-[40px]" />;
    case "OTHER":
      return <OTHERICON className="w-[40px] h-[40px]" />;
    default:
      return <OTHERICON className="w-[40px] h-[40px]" />; // or a default icon if needed
  }
};

export default DocumentsTypesCard;
