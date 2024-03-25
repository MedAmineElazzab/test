import { Organization } from "@/_v1/api/organization";
import Link from "next/link";
interface props {
  data: {
    serieId: number;
    organizationId: number;
    organization: Organization;
  }[];
}
export default function Institutions({ data }: props) {
  return (
    <div className=" flex flex-col  py-[30px] gap-[30px] rounded-md  px-[25px] bg-white border">
      <h2 className="font-[500]">Le soutient institutionnel de :</h2>
      <div className="flex flex-col">
        {data?.map((el, index) => {
          return (
            <div
              key={index}
              className="organisation-note-detailed  flex items-center gap-4 w-full"
            >
              <div className="logo w-[45px] h-[45px] rounded-full border flex justify-center items-center">
                <svg
                  width="43"
                  height="43"
                  viewBox="0 0 43 43"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="21.5"
                    cy="21.5"
                    r="21.5"
                    fill="#0049E0"
                    fillOpacity=".08"
                  />
                  <g clipPath="url(#a)">
                    <path
                      d="M21.14 10.719c-.004 1.9 0 3.795 0 5.69l-4.387 3.661c-.885.738-1.298 1.611-1.298 2.628v.634h-2.94a2.16 2.16 0 0 0-2.156 2.156v6.793a.36.36 0 0 0 .36.36c7.188-.002 14.376.001 21.562.001a.356.356 0 0 0 .331-.223.36.36 0 0 0 .027-.138V25.49a2.158 2.158 0 0 0-2.153-2.157h-2.94v-.635c0-1.198-.509-1.986-1.299-2.628l-4.389-3.663v-1.408h3.994c.79 0 1.438-.647 1.438-1.437v-1.765c0-.79-.647-1.438-1.438-1.438H22.87c-.486-.007-.486.726 0 .72h2.982a.71.71 0 0 1 .72.718v1.765a.71.71 0 0 1-.72.719h-3.994v-3.562c0-.53-.719-.539-.719 0Zm.36 6.325 4.277 3.57c.662.6 1.05 1.091 1.05 2.084-.016 2.715 0 5.436 0 8.168-.007.486.726.486.718 0v-6.814h2.941a1.424 1.424 0 0 1 1.435 1.438v6.434l-7.869-.002v-3.477a2.16 2.16 0 0 0-2.157-2.157h-.79a2.16 2.16 0 0 0-2.157 2.157v3.477h-7.87v-6.434c0-.802.635-1.437 1.438-1.437h2.939v6.883c-.008.486.725.486.718 0 .002-2.745 0-5.5 0-8.236 0-.993.388-1.484 1.05-2.085h.002l4.275-3.569Zm-2.108 4.098c-.468.033-.435.73.034.719h1.143c.49.01.49-.73 0-.719h-1.177Zm3.002 0c-.468.033-.434.73.035.719h1.143c.49.01.49-.73 0-.719h-1.178Zm-2.968 2.65c-.48 0-.48.72 0 .72h1.143c.48 0 .48-.72 0-.72h-1.143Zm3.003 0c-.48 0-.48.72 0 .72h1.143c.48 0 .48-.72 0-.72H22.43Zm-9.573 2.223c-.423 0-.446.72.036.72h1.143c.49.01.49-.73 0-.72h-1.179Zm16.17 0c-.467.035-.431.733.038.72h1.143c.49.01.49-.73 0-.72h-1.18Zm-7.921.993h.79a1.427 1.427 0 0 1 1.439 1.437v3.477h-3.667v-3.477a1.427 1.427 0 0 1 1.438-1.437Zm-8.25 1.66c-.469.034-.433.733.037.719h1.143c.47-.01.47-.709 0-.72h-1.18Zm16.171 0c-.468.034-.432.733.038.719h1.143c.47-.01.47-.709 0-.72h-1.18Z"
                      fill="#0049E0"
                    />
                  </g>
                  <defs>
                    <clipPath id="a">
                      <path fill="#fff" d="M10 10h23v23H10z" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col gap-1 w-[calc(100%-55px)]">
                <Link
                  href={"/institutions/" + el.organization.slug}
                  className="text-[15px] w-full hover:underline  line-clamp-1 "
                >
                  {el.organization.name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
