import {
  DescriptionIcon,
  ModuleDescription,
  ModuleRessources,
  ModuleTranscript,
  ResourcesIcon,
  Tabs,
  TranscriptIcon,
} from "@/components";
import { Attachement, Transcription } from "@/services/types";
interface ModuleDetailsProps {
  description: string;
  transcript: Transcription[];
  ressources: Attachement[];
  currentLang?: string;
  currentTime: number;
  videoRef: HTMLVideoElement;
}
export function ModuleDetails({ ...props }: ModuleDetailsProps) {
  return (
    <div className="w-full bg-white p-4 shadow-header-module-single  rounded-lg">
      <Tabs
        defaultValue={"Description"}
        data={[
          {
            component: <ModuleDescription description={props.description} />,
            icon: <DescriptionIcon />,
            name: "Description",
          },
          {
            component:
              props.videoRef && props.currentTime && props.currentLang ? (
                <ModuleTranscript
                  videoRef={props.videoRef}
                  currentTime={props.currentTime}
                  transcript={props.transcript}
                  lang={props.currentLang as string}
                />
              ) : (
                <p className="text-gray-500 text-sm leading-relaxed">
                  {" Essayez d'activer les sous-titres."}
                </p>
              ),
            icon: <TranscriptIcon />,
            name: "Transcription",
          },
          {
            component: <ModuleRessources ressources={props.ressources} />,
            icon: <ResourcesIcon />,
            name: "Ressources",
          },
        ]}
      />

    </div>
  );
}
