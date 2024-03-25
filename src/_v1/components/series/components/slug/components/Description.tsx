import { Serie } from "@/_v1/api/serie";
import { DisplayAttachment } from "@/_v1/components/notes/components/slug";
import { CertifactCardVector } from "@/_v1/icons";
import { FullPath } from "@/_v1/lib/utils";

export default function Description({ serie }: { serie: Serie }) {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-5">
        <h1 className="text-[21px] font-[500]">Description</h1>
        <p
          className={
            "w-[93%] leading-7 w1500:w-full transition-all text-slate-900 text-justify"
          }
        >
          {serie.description}
        </p>
      </div>
      {serie.certification && (
        <div className="relative flex items-center my-[40px]  w-[93%] w1500:w-full  justify-between ">
          <div className="bg-primary-normal/10  rounded-md flex flex-col gap-4 w-full border-primary-normal border px-[20px] py-[50px]">
            <h2
              //  onClick={handleCertifFile}
              className="font-[500] text-[24px]"
            >
              Earn a career certificate
            </h2>
            <p className="text-[#1F1F1F] text-sm flex flex-col gap-1">
              <span>
                Add this credential to your LinkedIn profile, resume, or CV{" "}
              </span>
              <span>
                Share it on social media and in your performance review
              </span>
            </p>
          </div>
          <div className="absolute bottom-0 right-0 top-0 bg-white">
            <CertifactCardVector className="drop-shadow-lg w-[300px]" />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-5">
        <h1 className="text-[21px] font-[500]">Objectifs</h1>
        <p className="w-[93%] leading-7  text-slate-900 w1500:w-full text-justify">
          {serie.objective}
        </p>
      </div>

      <div className="flex flex-col gap-5 my-[20px]  w-[93%] w1500:w-full ">
        <h1 className="text-[21px] font-[500]">Documents</h1>
        <div className="flex flex-wrap gap-2">
          {serie.Attachement.map((el, index) => {
            return (
              <DisplayAttachment
                key={index}
                type={el.type}
                href={FullPath(el.path)}
                name={el.name}
                size={el.size}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
