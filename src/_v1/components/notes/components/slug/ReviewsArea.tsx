import api from "@/_v1/api/api";
import { Review } from "@/_v1/api/note";
import Button from "@/_v1/components/Buttons/Button";
import { Input } from "@/_v1/components/Inputs";
import { CommentReviewFormResolver } from "@/_v1/components/Resolvers";
import { Avatar, Rating, Textarea } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconStarFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReviewPercentage from "./reviews";
interface ReviewsAreaProps {
  reviews: {
    noteId: number;
    review: Review;
    reviewId: number;
  }[];
  id: number;
}
export default function ReviewsArea({ reviews, id }: ReviewsAreaProps) {
  const [currentReviews, setCurrentReviews] = useState<Review[]>(
    reviews?.map((el) => {
      return el.review;
    })
  );
  const { user } = useSelector((state: any) => state.user);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [myReview, setIsReviewed] = useState<Review | null>();
  const { onSubmit, getInputProps, setFieldValue, setValues, values } =
    useForm<{
      rate: number;
      email: string;
      text?: string;
      name: string;
    }>({
      validate: yupResolver(CommentReviewFormResolver),
      initialValues: {
        email: "",
        name: "",
        rate: 5,
        text: "",
      },
    });
  const updateReviewById = (newReview: Review, reviewId: number) => {
    setCurrentReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId ? { ...review, ...newReview } : review
      )
    );
  };
  const handleSubmit = async (val: {
    rate: number;
    email: string;
    text?: string;
    name: string;
  }) => {
    setIsloading(true);
    try {
      const { data } = await api.post<Review>("/review/note/" + id, {
        ...val,
      });
      if (myReview) {
        updateReviewById(data, data.id);
        setIsReviewed(data);
        notifications.show({
          id: "load-data",
          title: (
            <span className="font-bold">
              {"Thank you for Changing your feedback. "}
            </span>
          ),
          message: <span>{"your review was changed successfully !!!"}</span>,
          icon: <IconCheck className="w-[40px]" />,
          autoClose: 3000,
          styles: {
            icon: {
              width: "2.75rem",
              height: "2.75rem",
            },
          },
          color: "green",
        });
      } else {
        notifications.show({
          id: "load-data",
          title: (
            <span className="font-bold">
              {"Thank you for sharing your feedback. "}
            </span>
          ),
          message: <span>{"your review was submitted successfully !!!"}</span>,
          icon: <IconCheck className="w-[40px]" />,
          autoClose: 3000,
          styles: {
            icon: {
              width: "2.75rem",
              height: "2.75rem",
            },
          },
          color: "green",
        });
        setIsloading(false);
        setCurrentReviews((prev) => [...prev, data]);
      }
      setIsloading(false);
    } catch (error) {
      console.log(error);
      setIsloading(false);
    }
  };

  useEffect(() => {
    setFieldValue("email", user?.email);
    setFieldValue("name", user?.firstName + " " + user?.lastName);
    if (myReview) {
      setFieldValue("text", myReview?.text);
    }
    setIsReviewed(
      currentReviews?.find((el) => el?.userId === user?.id) || null
    );
  }, [user, myReview, currentReviews]);
  return (
    <div className="w-full bg-primary-light/60 flex items-start justify-between px-[50px] w1300:px-[20px] py-[30px] w1100:flex-col w1100:gap-[50px] ">
      <div className="statistics flex flex-col w1100:w-full gap-6 w1100:flex-row w1100:justify-between w800:flex-col w800:gap-12">
        <div className="flex flex-col gap-6">
          <h2 className="text-[21px] font-[600]">Learner reviews</h2>
          <div className="flex items-end gap-4">
            <div className="flex items-center">
              <IconStarFilled className="w-[30px] text-primary-normal" />
              <span className="text-4xl font-[600]">
                {currentReviews?.length > 0
                  ? (
                      currentReviews?.reduce(
                        (acc, curr) => acc + curr.rate,
                        0
                      ) / currentReviews?.length
                    )?.toFixed(1)
                  : "0.0"}
              </span>
            </div>
            <span className="text-slate-600 mb-[6px]">
              /{currentReviews?.length} reviews
            </span>
          </div>
          <div className="w-[330px]  flex flex-col gap-2 px-2 ">
            <ReviewPercentage
              stars={5}
              numberOfComments={
                currentReviews?.filter((el) => el?.rate === 5)?.length
              }
              total={currentReviews?.length}
            />
            <ReviewPercentage
              stars={4}
              numberOfComments={
                currentReviews?.filter((el) => el?.rate === 4)?.length
              }
              total={currentReviews?.length}
            />
            <ReviewPercentage
              stars={3}
              numberOfComments={
                currentReviews?.filter((el) => el?.rate === 3)?.length
              }
              total={currentReviews?.length}
            />
            <ReviewPercentage
              stars={2}
              numberOfComments={
                currentReviews?.filter((el) => el?.rate === 2)?.length
              }
              total={currentReviews?.length}
            />
            <ReviewPercentage
              stars={1}
              numberOfComments={
                currentReviews?.filter((el) => el?.rate === 1)?.length
              }
              total={currentReviews?.length}
            />
          </div>
        </div>
        {myReview && (
          <div className="">
            <h2 className="text-[21px] hidden w1300:flex font-[600] mb-[30px]">
              Your Review
            </h2>
            <div className="w-[330px] w800:w-full h-fit flex flex-col gap-1 rounded-[4px] px-[10px] py-[15px] border border-primary-normal/5 bg-primary-normal/5 ">
              <div className="header flex gap-2 items-center">
                <Avatar
                  radius={"50%"}
                  sx={{
                    [".mantine-Avatar-placeholder"]: {
                      color: "#0049e0",
                      background: "#fff",
                      textTransform: "uppercase",
                    },
                  }}
                >
                  {(user?.firstName as string).slice(0, 1) +
                    (user?.lastName as string).slice(0, 1)}
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-[500]">
                    {user?.firstName + " " + user?.lastName}
                  </span>
                  <Rating
                    readOnly
                    size="xs"
                    sx={{
                      [".mantine-tkirza"]: {
                        stroke: "#0049e0",
                        fill: "#0049e0",
                      },
                      [".mantine-oxsuqt"]: {
                        stroke: "#868E9680",
                        fill: "#868E9680",
                      },
                    }}
                    onChange={(val) => {
                      setFieldValue("rate", val);
                    }}
                    value={myReview?.rate}
                  />
                </div>
              </div>
              <p className="text-sm mt-1 text-[#333] line-clamp-3">
                {myReview?.text}
              </p>
            </div>
          </div>
        )}
      </div>
      <form
        onSubmit={onSubmit(handleSubmit)}
        aria-disabled
        className={"w-[800px] w1300:w-[600px] flex flex-col gap-4 w1100:w-full"}
      >
        <div className="flex flex-col gap-3">
          <h2 className="text-[21px] font-[600]">Leave a reply</h2>
          <p className="text-[#1E293B]">
            Your email address will not be published. Required fields are marked
            <b> *</b>
          </p>
        </div>
        <div className="container-form mt-3 flex flex-col gap-4">
          <div>
            {myReview ? (
              <div>
                <Rating
                  sx={{
                    [".mantine-3wncv1"]: {
                      stroke: "#0049e0",
                      fill: "#0049e0",
                    },
                  }}
                  onChange={(val) => {
                    setFieldValue("rate", val);
                  }}
                  defaultValue={myReview.rate}
                />
              </div>
            ) : (
              <Rating
                sx={{
                  [".mantine-3wncv1"]: {
                    stroke: "#0049e0",
                    fill: "#0049e0",
                  },
                }}
                onChange={(val) => {
                  setFieldValue("rate", val);
                }}
                defaultValue={5}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Your name*"
              withAsterisk
              {...getInputProps("name")}
              className="pointer-events-none"
              value={user?.firstName + " " + user?.lastName}
            />
            <Input
              placeholder="Your Email*"
              withAsterisk
              className="pointer-events-none"
              {...getInputProps("email")}
              value={user?.email}
            />
          </div>
          <div>
            <Textarea
              placeholder="Your comment"
              sx={{
                ["textarea:focus"]: {
                  borderColor: "#0049e0",
                },
              }}
              styles={{
                input: {
                  height: "170px",
                },
              }}
              {...getInputProps("text")}
            />
          </div>
          {myReview ? (
            <Button
              loading={isLoading}
              type="submit"
              className="w-fit hover:bg-primary-normal/80 w1100:!w-full"
            >
              Edit your review
            </Button>
          ) : (
            <Button
              loading={isLoading}
              type="submit"
              className="w-fit hover:bg-primary-normal/80 w1100:!w-full"
            >
              Save your review
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
