import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/_v1/api/api";
import useFail from "@/_v1/hooks/useFail";
import useAlerts from "@/_v1/hooks/useAlerts";
import { useRouter } from "next/router";
import { sendMasterClassesQuestions } from "@/_v1/services/master-classes";
import useProgress, { CustomButton } from "@/_v1/hooks/useProgress";

type Props = {
  currentSlug: string;
};
type QuestionsProps = {
  question_1: string | undefined;
  question_2: string | undefined;
  question_3: string | undefined;
  // question_2: string;
  // question_3: string;
};

// .matches(
//       /\?/g,
//       "Question format invalid. Kindly revise or provide more details."
//     )

const schema = yup.object().shape({
  question_1: yup.string().trim(),
  question_2: yup.string().trim(),
  question_3: yup.string().trim(),
});

const Page = ({ currentSlug }: Props) => {
  const { push } = useRouter();
  const { onAlert, onThemeAlert } = useAlerts();
  const { setFail, ErrorContentJSX } = useFail();
  const { progress, setProgress } = useProgress();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionsProps>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: QuestionsProps) => {
    try {
      setProgress(true);
      let questions: (string | undefined)[] = [];
      if (data?.question_1 !== "")
        questions = [...questions, data?.question_1?.trim()];
      if (data?.question_2 !== "")
        questions = [...questions, data?.question_2?.trim()];
      if (data?.question_3 !== "")
        questions = [...questions, data?.question_3?.trim()];

      if (questions.length > 0) {
        setFail(undefined);
        await sendMasterClassesQuestions(currentSlug, questions);
        onThemeAlert(
          "Success",
          `You have been sent your (${questions.length}) questions successfully!`,
          "SUCCESS",
          "DARK",
          5000
        );
        push(`/master-class/${currentSlug}`);
      } else {
        // setFail("Please include at least one question in your submission.");
        onAlert(
          "Error",
          "Please include at least one question in your inquiries.",
          "ERROR",
          10000
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setProgress(false);
    }
  };
  return (
    <>
      <div className="bg-[#0049E005] text-[#141518] min-h-[calc(100vh-175px)] p-[30px] ">
        <div className="m-auto min-h-[calc(100vh-191px)] flex flex-col items-center justify-center max-w-[600px] w-[100%] py-[60px]">
          <h3 className="max-w-[550px] w-[100%] text-center text-[24px] mb-[45px] font-semibold">
            Share any questions you have, and I&apos;ll be more than happy to
            assist you with detailed responses.
          </h3>
          {ErrorContentJSX()}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" w-[100%] flex flex-col gap-[30px]"
          >
            <div className="flex flex-col gap-[30px]">
              <div>
                <div className="relative flex items-center">
                  <span
                    className={`
                      absolute w-[22px] h-[22px] rounded-full flex items-center justify-center bg-[#94A3B8] text-[16.5px] left-[15px]
                       ${
                         errors.question_1 && "!bg-[#930303]/50 !text-[#f64b3c]"
                       }
                    `}
                  >
                    1
                  </span>
                  <input
                    {...register("question_1")}
                    className={`
                      h-[50px] w-[100%] bg-[#282C38]/10 placeholder:text-[#94A3B8] pl-[50px]
                      ${
                        errors.question_1 &&
                        "bg-[#f64b3c] placeholder:!text-[#930303]/60"
                      }
                    `}
                    type="text"
                    placeholder="Type your question here..."
                    // onChange={() => setFail(undefined)}
                  />
                </div>
                {errors.question_1 && (
                  <p className="text-[14px] mt-[10px] text-[#f64b3c]">
                    {errors.question_1.message}
                  </p>
                )}
              </div>
              <div>
                <div className="relative flex items-center">
                  <span
                    className={`
                      absolute w-[22px] h-[22px] rounded-full flex items-center justify-center bg-[#94A3B8] text-[16.5px] left-[15px]
                       ${
                         errors.question_2 && "!bg-[#930303]/50 !text-[#f64b3c]"
                       }
                    `}
                  >
                    2
                  </span>
                  <input
                    {...register("question_2")}
                    className={`
                      h-[50px] w-[100%] bg-[#282C38]/10 placeholder:text-[#94A3B8] pl-[50px]
                      ${
                        errors.question_2 &&
                        "bg-[#f64b3c] placeholder:!text-[#930303]/60"
                      }
                    `}
                    type="text"
                    placeholder="Type your question here..."
                    // onChange={() => setFail(undefined)}
                  />
                </div>
                {errors.question_2 && (
                  <p className="text-[14px] mt-[10px] text-[#f64b3c]">
                    {errors.question_2.message}
                  </p>
                )}
              </div>
              <div>
                <div className="relative flex items-center">
                  <span
                    className={`
                      absolute w-[22px] h-[22px] rounded-full flex items-center justify-center bg-[#94A3B8] text-[16.5px] left-[15px]
                       ${
                         errors.question_3 && "!bg-[#930303]/50 !text-[#f64b3c]"
                       }
                        `}
                  >
                    3
                  </span>
                  <input
                    {...register("question_3")}
                    className={`
                      h-[50px] w-[100%] bg-[#282C38]/10 placeholder:text-[#94A3B8] pl-[50px]
                      ${
                        errors.question_3 &&
                        "bg-[#f64b3c] placeholder:!text-[#930303]/60"
                      }
                    `}
                    type="text"
                    placeholder="Type your question here..."
                    // onChange={() => setFail(undefined)}
                  />
                </div>
                {errors.question_3 && (
                  <p className="text-[14px] mt-[10px] text-[#f64b3c]">
                    {errors.question_3.message}
                  </p>
                )}
              </div>
            </div>
            {/* <button className="h-[50px] w-[100%] bg-[#0049E0]" type="submit">
              Send
            </button> */}
            <CustomButton
              className="h-[50px] w-[100%] bg-[#0049E0] !text-[white] flex items-center justify-center"
              type="submit"
              name="Send"
              progress={progress}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { query } = context;
  const { slug } = query;
  // Pass data to the page via props

  return {
    props: {
      currentSlug: slug,
    },
  };
}

export default Page;
