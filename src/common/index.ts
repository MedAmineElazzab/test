
export const requirements = [
  { re: /^.{8,}$/, label: "Minimum 8 caractères" },
  { re: /[0-9]/, label: "Au moins un numéro" },
  //   { re: /[a-z]/, label: "Inclure une lettre minuscule" },
  { re: /[A-Z]/, label: "Inclure une lettre majuscule" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Au moins un symbole" },
];

export function getStrength(password: string) {
  let multiplier = password.length > 3 ? 0 : 1;
  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });
  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}


export const scrollToTop = () => {
  const headerElement = document.getElementById("header-id");
  if (headerElement) {
    headerElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

