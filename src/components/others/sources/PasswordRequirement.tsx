import { CheckCircle, XCircle } from "@/components";
import { Box, Text } from "@mantine/core";

export function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      // c={meets ? "#22c55e" : "#667085"}  
      size="sm"
      className="flex items-center "
    >
      {meets ? (
        <CheckCircle className="text-green-500 w-5 h-5" />
      ) : (
        <XCircle className=" w-5 h-5 text-red-500" />
      )}
      <Box ml={10} className="">{label}</Box>
    </Text>
  );
}

