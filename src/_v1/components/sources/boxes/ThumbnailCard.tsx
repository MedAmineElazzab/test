import Image from "next/image";
import React, { useState } from "react";

type Props = {
  height: string;
  path: string;
  withOverflow?: boolean;
};

const ThumbnailCard = ({ height, path, withOverflow = true }: Props) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <>
      <picture
        className={`absolute z-[0] top-[0] right-[0] h-[${height}] w-[100%] overflow-hidden max-w-[100%] flex items-center justify-center`}
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
          <div className="w-[100%] h-[100%] z-[1] top-[0] right-[0] bg-gradient-to-b from-black/0 to-black/80 opacity-[0.75]"></div>
        )}
      </picture>
    </>
  );
};

export default ThumbnailCard;
