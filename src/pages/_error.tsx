import Button from "@/_v1/components/Buttons/Button";
import { LottieAnimations } from "@/components/Animation";
import { IconArrowLeft } from "@tabler/icons-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { nothingFoundLottie } from "./series";

function Error({
  message,
  description,
}: {
  message?: string;
  description?: string;
}) {
  const { back } = useRouter();
  return (
    <>
      <Head>
        <title>Meducate : page not found</title>
      </Head>
      <div className="w-full h-[calc(100vh-64px)] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="pointer-events-none w-[200px]">
            <LottieAnimations loop animationData={nothingFoundLottie} />
          </div>
          <div className="flex items-center flex-col gap-4">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-[25px] text-center font-[600] w-full">
                {message}
              </h2>
              <p className="text-center text-[#484f59]">{description}</p>
            </div>
            <Button
              leftIcon={<IconArrowLeft stroke={1.4} className="w-[19px]" />}
              onClick={back}
              color="primary"
            >
              Go back
            </Button>
            
          </div>
        </div>
      </div>
    </>
  );
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
