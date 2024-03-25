import { UserPatched } from "@/@types";
import { useGetSections } from "@/_v1/api/section";
import {
  AMM,
  CongresScientifiques,
  Formations,
  MasterClasses,
  Pharmacovigilance,
  ProtocoleTherapeutique,
  R_D,
  Reglementation,
} from "@/_v1/icons";
import { useForm, yupResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import { SectionsForm } from "../Resolvers/@types";
import { SectionsFormResolver } from "../Resolvers/steps";
import Section from "../Section";
interface SectionFormProps {
  onSubmit: (sections: number[], setIsloading?: any) => void;
  previous?: any;
  user: UserPatched;
}
export default function SectionForm({
  onSubmit,
  previous,
  user,
}: SectionFormProps) {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([100]);
  const {
    data: sections,
    isLoading: isLoadingSections,
    refetch,
  } = useGetSections();
  const Icons = [
    {
      alias: "FR",
      Icon: <Formations />,
    },
    {
      alias: "R&D",
      Icon: <R_D />,
    },
    {
      alias: "AMM",

      Icon: <AMM />,
    },
    {
      alias: "PHARMA",
      Icon: <Pharmacovigilance />,
    },
    {
      alias: "CS",
      Icon: <CongresScientifiques />,
    },
    {
      alias: "PT",

      Icon: <ProtocoleTherapeutique />,
    },
    {
      alias: "REG",

      Icon: <Reglementation />,
    },
    {
      alias: "MC",
      Icon: <MasterClasses />,
    },
  ];
  const {
    onSubmit: onSubmitt,
    setFieldValue,
    values,
    errors,
  } = useForm<SectionsForm>({
    initialValues: {
      sections: [],
    },
    validate: yupResolver(SectionsFormResolver),
  });
  useEffect(() => {
    if (user) {
      setFieldValue(
        "sections",
        user?.UserSections?.map((el) => {
          return el.sectionId;
        }) || []
      );
      setSelectedIds(
        user?.UserSections?.map((el) => {
          return el.sectionId;
        }) || []
      );
      // set
    }
  }, [user]);
  console.log(values.sections);
  return (
    <div className="w-full  mt-[30px]">
      <form
        className="w-full"
        onSubmit={onSubmitt((data) => onSubmit(data?.sections, setIsloading))}
      >
        <div className="grid grid-cols-2 gap-x-3 gap-y-6">
          {isLoadingSections || selectedIds.includes(100)
            ? "loading"
            : sections?.map((el, index) => {
                return (
                  <Section
                    onClick={(isActive, setActive, sectionId) => {
                      if (isActive) {
                        setFieldValue(
                          "sections",
                          values?.sections?.filter((el) => el !== sectionId)
                        );
                        setActive(false);
                      } else {
                        values?.sections?.push(sectionId);
                        setFieldValue("sections", values?.sections);
                        setActive(true);
                      }
                    }}
                    key={index}
                    Icon={
                      Icons?.find(({ Icon, alias }) => el?.alias == alias)
                        ?.Icon || <Formations />
                    }
                    name={el?.name}
                    sectionId={el?.id}
                    active={
                      selectedIds
                        ? selectedIds?.find((element) => element == el?.id)
                          ? true
                          : false
                        : false
                    }
                  />
                );
              })}
        </div>
        <div className="buttons flex items-center gap-3 mt-[40px]">
          <Button
            disabled={isLoading}
            onClick={previous}
            type="button"
            className="border-primary-normal bg-transparent border font-[600] w-[130px] hover:bg-primary-light transi text-primary-normal "
          >
            Previous
          </Button>
          <Button
            loading={isLoading}
            type="submit"
            className="bg-primary-normal rounded-[7px] w-[130px] hover:bg-primary-normal/80 transi text-white "
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
