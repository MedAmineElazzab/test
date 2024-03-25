import { Organization } from "@/api";
import { Badge, TopPartnerIcon, VerifiedIcon } from "@/components";
import { FullPath } from "@/lib";
import Link from "next/link";
interface props {
  data: {
    noteId: number;
    organizationId: number;
    organization: Organization;
  }[];
}
export default function NoteExpert({ data }: props) {
  return (
    <div
      className="flex flex-col   gap-4  p-4 bg-white rounded-lg  "
      style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
    >
      <h3 className="uppercase text-[#667085] text-xs font-[600]">
        Partenaires
      </h3>
      <div className="w-full h-[1px] bg-[#F2F4F7]"></div>
      <div className="flex flex-col gap-3">
        {data?.map((el, index) => (
          <div key={index} className=" flex items-center  gap-2 w-full">
            <div className=" w-[40px] h-[40px] rounded-full bg-[#E6EDFC] flex justify-center items-center">
              <img
                className="w-[27px] object-cover"
                src={
                  el.organization.imagePath != null
                    ? FullPath(el.organization.imagePath)
                    : "/assets/shape-meducate-logo.svg"
                }
                alt=""
              />
            </div>
            <div className=" flex flex-col gap-1 w-[calc(100%-95px)]">
              <Link
                href={"/institutions/" + el.organization.slug}
                className="text-base text-[#101828] font-[600] hover:underline font-[500] line-clamp-1"
              >
                {el.organization.name}
              </Link>
            </div>
            <VerifiedIcon 
            style={{transform:"scale(2)"}}
            className="   w-[22px] mb-[1px] text-primary-normal" />
          </div>
        ))}
      </div>
     
    </div>
  );
}
