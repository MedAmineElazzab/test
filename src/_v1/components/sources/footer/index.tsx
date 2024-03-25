import LogoMeducate from "@/_v1/icons/sources/LogoMeducate";

interface Props {
  dark: boolean;
}

const Footer = ({ dark }: Props) => {
  return (
    <footer
      className={`
        flex justify-center items-center py-[15px]
        transition ease-in-out delay-50
        ${dark ? "bg-[#1E1F25] border-[#282C38] border-l-[1px]" : "bg-white"}
    `}
    >
      {/* <Image src="/assets/logo.svg" alt="footer" width={200} height={80} /> */}
      <LogoMeducate width={175} color={!dark ? "#1E1F25" : "#ffffff"} />
    </footer>
  );
};

export default Footer;
