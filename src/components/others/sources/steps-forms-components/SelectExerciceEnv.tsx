import { useGetEnvironment } from "@/api";
import { Select, Skeleton } from "@/components";
import { GetInputProps } from "@mantine/form/lib/types";

interface SelectExerciceEnvProps {
  getInputProps?: GetInputProps<{}>;
  defaultValue?: number;
}

export function SelectExerciceEnv({ ...props }: SelectExerciceEnvProps) {
  const { data: envExs, isLoading, isError } = useGetEnvironment();

  return isLoading ? (
    <div>
      <Skeleton height={35} mb={"xs"} />
      <Skeleton height={35} />
    </div>
  ) : isError ? (
    <div>
      <p className="text-red-500">Error loading data</p>
    </div>
  ) : (
    <Select
      label={"Environnement d’exercice *"}
      placeholder="Choisir une option"
      clearable
      searchable
      data={
        envExs?.map((envEx) => ({
          value: String(envEx?.id),
          label: envEx?.name,
        })) || []
      }
      {...props?.getInputProps?.("environmentId")}
      value={props?.defaultValue ? String(props?.defaultValue) : undefined}
      size="sm"
      color="#484f59"
    />
  );
}
