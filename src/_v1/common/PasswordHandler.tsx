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
      // c={meets ? "#0A0A0C" : "red"}
      c={meets ? "#22c55e" : "#0A0A0C"}
      opacity={meets ? 1 : 0.34}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M7.89375 12.4125L13.2 7.10625L12.3375 6.2625L7.89375 10.7062L5.64375 8.45625L4.8 9.3L7.89375 12.4125ZM9 16.5C7.975 16.5 7.00625 16.3031 6.09375 15.9094C5.18125 15.5156 4.38437 14.9781 3.70312 14.2969C3.02187 13.6156 2.48437 12.8187 2.09062 11.9062C1.69687 10.9937 1.5 10.025 1.5 9C1.5 7.9625 1.69687 6.9875 2.09062 6.075C2.48437 5.1625 3.02187 4.36875 3.70312 3.69375C4.38437 3.01875 5.18125 2.48437 6.09375 2.09062C7.00625 1.69687 7.975 1.5 9 1.5C10.0375 1.5 11.0125 1.69687 11.925 2.09062C12.8375 2.48437 13.6312 3.01875 14.3062 3.69375C14.9812 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.025 16.3031 10.9937 15.9094 11.9062C15.5156 12.8187 14.9812 13.6156 14.3062 14.2969C13.6312 14.9781 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5Z"
            className="fill-green-500"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M7.89375 12.4125L13.2 7.10625L12.3375 6.2625L7.89375 10.7062L5.64375 8.45625L4.8 9.3L7.89375 12.4125ZM9 16.5C7.975 16.5 7.00625 16.3031 6.09375 15.9094C5.18125 15.5156 4.38437 14.9781 3.70312 14.2969C3.02187 13.6156 2.48437 12.8187 2.09062 11.9062C1.69687 10.9937 1.5 10.025 1.5 9C1.5 7.9625 1.69687 6.9875 2.09062 6.075C2.48437 5.1625 3.02187 4.36875 3.70312 3.69375C4.38437 3.01875 5.18125 2.48437 6.09375 2.09062C7.00625 1.69687 7.975 1.5 9 1.5C10.0375 1.5 11.0125 1.69687 11.925 2.09062C12.8375 2.48437 13.6312 3.01875 14.3062 3.69375C14.9812 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.025 16.3031 10.9937 15.9094 11.9062C15.5156 12.8187 14.9812 13.6156 14.3062 14.2969C13.6312 14.9781 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5Z"
            className="fill-[#0A0A0C]"
            // fillOpacity="0.34"
          />
        </svg>
      )}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

export const requirements = [
  { re: /^.{6,}$/, label: "Includes at least 6 characters" },
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

export function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}
