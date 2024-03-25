import { Meta } from "@/@types";
import { api } from "@/api";
import {
  ModuleSeriesAreaChild,
  SectionCardLayout,
  Skeleton,
} from "@/components";
import { Module, SerieModule, ViewStates } from "@/services/types";
import { Box, ScrollArea } from "@mantine/core";
import { useEffect, useState } from "react";
interface ModuleSerieAreaProps {
  moduleSeries: SerieModule[];
  slug: string;
  moduleId: number;
  serieId: number;
}
interface ModuleDT {
  imagePath: string | null;
  slug: string;
  duration: number;
  title: string;
  status: ViewStates;
}
export function ModuleSeriesArea({
  moduleSeries,
  slug,
  moduleId,
  serieId,
}: ModuleSerieAreaProps) {
  const [ModulesSeries, setModulesSeries] = useState<ModuleDT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(ModulesSeries);
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const { data  : {items}} = await api.get<{ meta: Meta; items: Module[] }>(
          `/module?page=1&perPage=15&sortBy=id&sortOrder=asc&seriesId=${serieId}&moduleId=${moduleId}`
        );
        setModulesSeries(
          items?.map((el) => ({
            duration: el.duration,
            imagePath: el.imagePath,
            slug: el.slug,
            status: el.status,
            title: el.title,
          })) || []
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchModules();

    return () => {
      setModulesSeries([]);
    };
  }, [slug]);

  const HandleSkelton = (num: number) => {
    const skeletons = [];
    for (let index = 0; index < num; index++) {
      skeletons.push(
        <div key={index}>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} width="70%" radius="xl" />
        </div>
      );
    }
    return skeletons;
  };

  return (
    <SectionCardLayout title="Regardez également :">
      <div className="flex flex-col gap-3">
        <ScrollArea
          className="relative "
          h={400}
          styles={{
            viewport: {
              padding: "",
              position: "relative",
            },
          }}
        >
          <Box className="flex relative flex-col gap-3 w-full">
            {isLoading ? (
              <div className="flex flex-col gap-6">
                {HandleSkelton(moduleSeries.length)}
              </div>
            ) : (
              ModulesSeries.map((el, index) => {
                return <ModuleSeriesAreaChild key={el.slug + index} {...el} />;
              })
            )}
          </Box>
        </ScrollArea>
      </div>
    </SectionCardLayout>
  );
}
