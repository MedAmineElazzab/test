import { IconStarFilled } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Rate } from "@/_v1/components";
import { Rating } from "@mantine/core";

type Props = {
  reviews: any;
  payload: (data: any) => void;
};

type CommentsProps = {
  rate: number;
  name: string;
  email: string;
  text: string | undefined;
  remember: boolean;
};

const schema = yup.object().shape({
  rate: yup.number().required(),
  name: yup.string().required().trim(),
  email: yup.string().required().email("please provide a valid email").trim(),
  text: yup.string().min(10, "please provide at least 10 charachter").trim(),
  remember: yup.bool().default(false),
});

const Reviews = ({ reviews, payload }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentsProps>({ resolver: yupResolver(schema) });

  const handleRateValue = (val: number) => {
    setValue("rate", val, { shouldValidate: true });
  };

  const onSubmit = async (data: CommentsProps) => {
    // console.log(data);
    const { text, name, email, rate } = data;
    await payload({ text, name, email, rate });
  };

  const [reviewsRanges, setReviewsRanges] = useState<any[] | undefined>(
    undefined
  );
  const handleReviewRanges = () => {
    const groupedRates = reviews?.content.reduce((acc: any, item: any) => {
      const { rate } = item;
      if (!acc[rate]) {
        acc[rate] = [];
      }
      acc[rate].push(item);
      return acc;
    }, {});

    // Calculating the total number of items
    const totalItems = reviews?.content.length;

    // Displaying the result
    let calculatorRanges: any[] = [];
    for (const rate in groupedRates) {
      const rateItems = groupedRates[parseInt(rate)];
      const percentage = (rateItems.length / totalItems) * 100;
      calculatorRanges = [
        ...calculatorRanges,
        { rate: rate, value: `${percentage.toFixed(2)}%` },
      ];
    }

    setReviewsRanges(calculatorRanges);
  };

  useEffect(() => {
    handleReviewRanges();
  }, []);

  return (
    <>
      <div className="flex gap-[20px]">
        {/* {JSON.stringify(reviews?.content)} */}
        <div className="flex flex-col flex-[1]">
          <div className="flex flex-col">
            <h4 className="text-[24px] mb-[15px] font-semibold">
              Learner reviews
            </h4>
            <div className="flex gap-[10px] items-end">
              <div className="flex items-center">
                <IconStarFilled className="w-[30px] text-primary-normal" />
                <span className="text-4xl font-[600]">{reviews?.range}</span>
              </div>
              <span className="text-slate-600 mb-[6px]">
                /{reviews?.count} reviews
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[12.5px] mt-[20px]">
            {/* Rate Bar 5 Stars */}
            {reviewsRanges?.map((item: any, index: number) => (
              <>
                <div className="flex gap-[10px] items-center">
                  <div className="text-[14px] font-semibold w-[40px]">
                    {item?.rate} stars
                  </div>
                  <div className="relative max-w-[225px] w-[100%] h-[7.5px] bg-[#E5E7E8] rounded-full">
                    <div
                      className="absolute h-[100%] top-[0] left-[0] bg-[#0056D2] rounded-full"
                      style={{ width: item?.value }}
                    ></div>
                  </div>
                  <div className="text-[14px] w-[45px]">{item?.value}</div>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-[1.5]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <h4 className="text-[24px] mb-[15px] font-semibold">
                Leave a Reply
              </h4>
              <div className="flex gap-[10px] items-end">
                <span className="text-slate-600 mb-[6px]">
                  Your email address will not be published. Required fields are
                  marked *
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-[15px] mt-[20px]">
              <div className="max-w-[calc(100%)] w-[100%] flex flex-col gap-[4px]">
                {/* <Rate payload={handleRateValue} /> */}
                <Rating
                  defaultValue={0}
                  color="#0049E0"
                  onChange={handleRateValue}
                />
                {errors.rate && (
                  <p className="text-[14px] text-[#f64b3c]">
                    {errors.rate.message}
                  </p>
                )}
              </div>
              <div className="max-w-[calc(50%-7.5px)] w-[100%] grid gap-[4px]">
                <input
                  className={`
                    bg-[#FFFFFF] border-[#33333380] border-[1px] rounded-[4px] !outline-none
                    w-[100%] h-[45px] px-[10px] py-[10px]
                    focus:border-[#0049E0]
                    ${
                      errors.name &&
                      "bg-[#ffe0e0] text-[#fa5252] !border-[#fa5252] placeholder:text-[#fa5252]/80"
                    }
                  `}
                  {...register("name")}
                  placeholder="Your Name *"
                />
                {errors.name && (
                  <p className="text-[14px] text-[#f64b3c]">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="max-w-[calc(50%-7.5px)] w-[100%] grid gap-[4px]">
                <input
                  className={`
                    bg-[#FFFFFF] border-[#33333380] border-[1px] rounded-[4px] !outline-none
                    w-[100%] h-[45px] px-[10px] py-[10px]
                    focus:border-[#0049E0]
                    ${
                      errors.email &&
                      "bg-[#ffe0e0] text-[#fa5252] !border-[#fa5252] placeholder:text-[#fa5252]/80"
                    }
                  `}
                  {...register("email")}
                  placeholder="Your Email *"
                />
                {errors.email && (
                  <p className="text-[14px] text-[#f64b3c]">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="max-w-[calc(100%)] w-[100%] grid gap-[4px]">
                <textarea
                  className={`
                    bg-[#FFFFFF] border-[#33333380] border-[1px] rounded-[4px] !outline-none
                    w-[100%] min-h-[140px] h-[100%] px-[10px] py-[10px]
                    focus:border-[#0049E0]
                    ${
                      errors.text &&
                      "bg-[#ffe0e0] text-[#fa5252] !border-[#fa5252] placeholder:text-[#fa5252]/80"
                    }
                  `}
                  {...register("text")}
                  placeholder="Your Comment Here..."
                ></textarea>
                {errors.text && (
                  <p className="text-[14px] text-[#f64b3c]">
                    {errors.text.message}
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <div className="my-[20px] flex flex-col">
                <div className="flex">
                  <input
                    className="inline mr-[10px]"
                    type="checkbox"
                    id="remember"
                    {...register("remember")}
                  />
                  <label className="inline" htmlFor="remember">
                    <p className="text-[#1F1F1F] ">
                      Save my name, email, and website in this browser for the
                      next time I comment.
                    </p>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#0049E0] px-[25px] py-[15px] text-[#ffffff]"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reviews;
