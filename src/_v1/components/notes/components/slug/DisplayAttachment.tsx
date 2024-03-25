import { AttachmentType } from "@/_v1/enum";
import DownloadIconAttatchment from "@/_v1/icons/sources/DownloadIconAttatchment";
import DownloadIconSolid from "@/_v1/icons/sources/DownloadIconSolid";
import PdfIcon from "@/_v1/icons/sources/PdfIcon";
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
import Link from "next/link";
import { ReactElement } from "react";

interface AttachmentProps {
  type: AttachmentType;
  name: string;
  size: string;
  href: string;
}

const getIconComponent = (type: AttachmentProps["type"]): ReactElement => {
  const iconMapping = {
    IMAGE: <IMAGEICON className="w-[40px] h-[40px]" />,
    VIDEO: <MP4ICON className="w-[40px] h-[40px]" />,
    AUDIO: <AUDIOICON className="w-[40px] h-[40px]" />,
    PDF: <PDFICON className="w-[40px] h-[40px]" />,
    WORD: <WORDICON className="w-[40px] h-[40px]" />,
    EXCEL: <EXCELICON className="w-[40px] h-[40px]" />,
    POWERPOINT: <POWERPOINTICON className="w-[40px] h-[40px]" />,
    OTHER: <OTHERICON className="w-[40px] h-[40px]" />,
  };

  return iconMapping[type] || iconMapping.OTHER;
};

export default function DisplayAttachment({
  type,
  name,
  size,
  href,
}: AttachmentProps) {
  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.download = name;
    downloadLink.href = href;
    downloadLink.target = "_blank";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div 
    style={{boxShadow:"rgba(0, 0, 0, 0.06) 0px 1px 4px"}}
    className="flex items-center justify-between w-[310px] gap-8 bg-white border rounded-[8px] p-[12px]">
      <div className="flex items-center gap-2">
        <div className="icon w-[40px]">{getIconComponent(type)}</div>
        <div className="details w-[calc(100px)] flex flex-col mt-[-6px]  ">
          <Link href={href} target="_blank" className=" text-[#101828] text-[14px] leading-[20px] font-[600]  w-fit max-w-full truncate hover:underline ">{name}</Link>
          <span className="text-[#667085] text-[12px] font-[400] ">{size}</span>
        </div>
      </div>

      <div
        className="download-btn transition-all  active:scale-95 hover:text-white cursor-pointer text-primary-normal     flex justify-center items-center"
        onClick={handleDownload}
      > 
        <DownloadIconSolid />
      </div>
    </div>
  );
}
 