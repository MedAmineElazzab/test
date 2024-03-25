import { api, setContext } from "@/api";
import {
  CommentsArea,
  ModuleDetails,
  ModuleDetailsArea,
  ModuleExpertArea,
  ModuleHeader,
  ModuleLayout,
  ModulePartnerArea,
  ModuleSeriesArea,
  ModuleTagsArea,
} from "@/components";
import { BACKEND_ROUTES, ModuleTitles } from "@/enum";
import Error from "@/pages/_error";
import { Module } from "@/services/types";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
export default function Index({ moduleData }: { moduleData: Module }) {
  const [ModuleData, setModuleData] = useState<Module | null>(moduleData);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [videoCaptionLanguage, setVideoCaptionLanguage] = useState<string>("");

  useEffect(() => {
    setModuleData(moduleData);
    console.log(moduleData);
    return () => {
      setModuleData(null);
    };
  }, [moduleData?.id]);

  if (ModuleData) {
    return (
      <ModuleLayout slug={ModuleData.slug}>
        <ModuleLayout.ContentSection>
          <ModuleHeader
            onLangChange={(lang) => {
              setVideoCaptionLanguage(lang);
            }}
            onLoadedVideoRef={(videoRef, currentTime) => {
              setVideoRef(videoRef);
              setCurrentTime(currentTime);
            }}
            {...ModuleData}
          />
          <ModuleDetails
            currentTime={currentTime as number}
            videoRef={videoRef as HTMLVideoElement}
            currentLang={videoCaptionLanguage}
            description={ModuleData.description}
            transcript={ModuleData.Transcription}
            ressources={ModuleData.Attachement}
          />
          <div className="relative w-full p-5">
            <CommentsArea
              total={ModuleData.reviewsCount}
              slug={moduleData.slug}
              id={moduleData.id}
              type={ModuleTitles.MODULE}
            />
          </div>
          <div className="mt-10"></div>
        </ModuleLayout.ContentSection>
        <ModuleLayout.RightSection>
          <>
            <ModuleExpertArea
              {...moduleData.moduleExpert.expert}
              isFollowed={moduleData.moduleExpert.isFollowed}
            />
            <ModulePartnerArea
              organizations={moduleData.ModulePartner.map((el) => {
                return el.organization;
              })}
            />
            {moduleData?.serie && (
              <ModuleSeriesArea
                serieId={moduleData.serie?.id}
                moduleId={moduleData.id}
                slug={moduleData.slug}
                moduleSeries={moduleData.serie.SerieModule}
              />
            )}

            <ModuleDetailsArea
              specialities={moduleData.SpecialityOnModule}
              diseases={ModuleData.DiseaseOnModule}
            />
            <ModuleTagsArea
              tags={moduleData.ModuleHashTag.map((el) => el.hashTag)}
            />
            <br />
          </>
        </ModuleLayout.RightSection>
      </ModuleLayout>
    );
  } else {
    return (
      <Error
        message={"Le module demandé n'est pas disponible."}
        description={
          "Veuillez mettre à jour votre recherche ou vos filtres, ou explorez d'autres options ci-dessous en cliquant ci-dessous"
        }
      />
    );
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  try {
    const { data } = await api.get<Module>(
      BACKEND_ROUTES.MODULE + "/" + query?.slug?.[0]
    );
    return {
      props: {
        moduleData: data,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      props: {
        moduleData: null,
      },
    };
  }
};
