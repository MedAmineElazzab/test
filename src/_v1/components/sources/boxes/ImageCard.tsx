import { scrollToTop } from "@/_v1/functions";
import { PlayIcon } from "@/_v1/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  height: string;
  path: string;
  iconSize: "small" | "large";
  link?: string;
  withOverflow?: boolean;
};

const ImageCard = ({
  height,
  iconSize,
  link = "#",
  path = "",
  withOverflow = true,
}: Props) => {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter()
  return (
    <>
      <picture
        className={`absolute top-[0] right-[0] h-[100%] w-[100%] overflow-hidden max-w-[100%] flex items-center justify-center`}
      >
        <Image
          layout="fill"
          objectFit="cover"
          // objectPosition={rtl ? "right" : "left"}
          className={`
                w-full h-full duration-700 ease-in-out
                ${
                  isLoading
                    ? "scale-110 blur-2xl grayscale"
                    : "scale-100 blur-0 grayscale-0"
                }
              `}
          onLoadingComplete={() => setLoading(false)}
          src={path}
          alt="meducate image"
        />
        {withOverflow && (
          <div className="absolute w-[100%] h-[100%] bg-gradient-to-b from-black/0 to-black/80"></div>
        )}
        <Link
          href={link}
          onClick={(e) => scrollToTop(e , link , router) }
          className="absolute z-[10] flex items-center justify-center"
        >
          <div
            className={`
              absolute bg-white/30 rounded-full flex items-center justify-center
              ${iconSize === "large" && "w-[68px] h-[68px]"}
              ${iconSize === "small" && "w-[44px] h-[44px]"}
            `}
          >
            <PlayIcon
              color="white"
              className={`
                ${iconSize === "large" && "w-[44px] h-[44px]"}
                ${iconSize === "small" && "w-[28px] h-[28px]"}
              `}
            />
          </div>
        </Link>
      </picture>
    </>
  );
};

export default ImageCard;
