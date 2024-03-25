import { useEffect, useState } from "react";
import Aside from "@/_v1/components/Aside";
import useVIP from "@/_v1/hooks/useVIP";
import { Footer, Header } from "../components";
import { scrollToTop } from "../functions";
import { useRouter } from "next/router";
import ArrowTop from "@/_v1/icons/sources/ArrowTop";

export default function DashboardLayout({
  children,
}: {
  children: JSX.Element;
}) {
  const { isVIP } = useVIP();

  const [showElement, setShowElement] = useState(false);

  // useEffect(() => {
  //   const allPage = document.getElementById("__next")
  //   const handleScroll = () => {
  //     // Récupérez la position de défilement en Y
  //     const scrollY = window.scrollY;
  //     console.log('Position de défilement en Y :', scrollY);
  //   };

  //   allPage?.addEventListener('scroll', handleScroll);

  //   return () => {
  //     allPage?.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
  const divElement = document.getElementById("element-scrollabl");

    if (divElement) {
      const handleScroll = () => {
        const yPos = divElement.scrollTop;
        setScrollPosition(yPos);
    
      };

      divElement.addEventListener("scroll", handleScroll);

      return () => {
        divElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [scrollPosition]); // La dépendance vide assure que useEffect ne s'exécute qu'une seule fois lors du montage

  console.log(scrollPosition , "scrollPosition");

  const scrollToTop = (e: any) => {
    e.preventDefault();

    // Scroll to the top
    const headerElement = document.getElementById("header-id");
    if (headerElement) {
      headerElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <main
      className={`relative h-screen w-[100%] overflow-hidden flex
      transition ease-in-out delay-50
      ${isVIP ? "bg-[#1E1F25]" : "bg-[#F3F4F8]"}`}
    >
      <Aside  />
      <div
        id="element-scrollabl"
        className="relative max-h-[100vh] w-[100%] overflow-y-scroll"
      >
        {/* <Header dark={isVIP} /> */}
        <Header  />
        <div
          className={`
            relative pt-[65px] w-[100%] min-h-[calc(100vh-64px)]
            transition ease-in-out delay-50
            ${isVIP ? "bg-[#141518]" : "bg-[transparent]"}
          `}
          id="header-id"
        >
          {children}
        </div>
        {/* {showElement && ( */}
        {scrollPosition > 20 &&(
          <div
            onScroll={(e) => console.log(e)}
            onClick={(e) => scrollToTop(e)}
            className="fixed cursor-pointer  w-[48px] h-[48px] flex items-center justify-center
          bg-[#0049E0] rounded-full bottom-[30px] right-[30px]  "
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
            }}
          >
            <ArrowTop />
          </div>
        )}

        {/* )} */}
        {/* <Footer dark={isVIP} /> */}
      </div>
    </main>
  );
}
