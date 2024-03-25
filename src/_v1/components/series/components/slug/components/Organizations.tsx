import { Organization } from "@/_v1/api/organization";
import Badge from "@/_v1/components/badges/Badge";
import { FullPath } from "@/_v1/lib/utils";
import Link from "next/link";
interface props {
  data: {
    serieId: number;
    organizationId: number;
    organization: Organization;
  }[];
}
export default function Organisations({ data }: props) {
  return (
    <div className="flex flex-col  py-[30px] gap-[30px] rounded-md  px-[25px] bg-white border  ">
      {data?.map((el, index) => {
        return (
          <div
            key={index}
            className="organisation-note-detailed flex items-center justify-between gap-2 w-full"
          >
            <div className="logo w-[45px] h-[45px] rounded-full border flex justify-center items-center">
              <img
                className="w-[32px] object-cover"
                src={
                  el.organization.imagePath != null
                    ? FullPath(el.organization.imagePath)
                    : "/assets/shape-meducate-logo.svg"
                }
                alt=""
              />
            </div>
            <div className="flex flex-col gap-1 w-[calc(100%-60px)]">
              <Link
                href={"/institutions/" + el.organization.slug}
                className="text-[15px] w-full font-[500] line-clamp-1 hover:underline"
              >
                {el.organization.name}
              </Link>
              <Badge
                style={{ background: "#0049e015" }}
                className=" border-primary-normal text-primary-normal"
              >
                Partenaire
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
