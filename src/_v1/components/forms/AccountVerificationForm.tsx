import { UserPatched } from "@/@types";
import UploadIcon from "@/_v1/icons/sources/UploadIcon";
import UploadIconAccespted from "@/_v1/icons/sources/UploadIconAccespted";
import UploadIconRejected from "@/_v1/icons/sources/UploadIconRejected";
import { ActionIcon, Group, Progress, Switch, Text, rem } from "@mantine/core";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { useForm, yupResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import { Input } from "../Inputs";
import { AccountVerificationForm as AccountVerificationFormType } from "../Resolvers/@types";
import { AccountVerificationFormResolver } from "../Resolvers/steps";

export default function AccountVerificationForm({
  previous,
  user,
  onSubmit,
}: {
  previous: any;
  user: UserPatched;
  onSubmit: (data: AccountVerificationFormType, setIsloading?: any) => void;
}) {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<FileWithPath | null>(null);
  const [currentFileLength, setcurrentFileLength] = useState<number>(0);

  const {
    onSubmit: onSubmitt,
    setFieldValue,
    getInputProps,
    values,
    errors,
  } = useForm<AccountVerificationFormType>({
    initialValues: {
      Attachement: "",
      registrationNumber: "",
    },
    validate: yupResolver(AccountVerificationFormResolver),
  });
  const handleAddFile = (files: FileWithPath[]) => {
    setFieldValue("registrationNumber", " ");
    setFieldValue("Attachement", files?.[0]);
    setCurrentFile(files?.[0]);
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (currentFile) {
      intervalId = setInterval(() => {
        setcurrentFileLength((prevLength) => prevLength + 10);
      }, 10);
    }

    if (currentFileLength === 100) {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentFile, currentFileLength]);
  console.log(values);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="icon mt-[40px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="57"
          height="57"
          viewBox="0 0 57 57"
          fill="none"
        >
          <g clipPath="url(#clip0_1728_8059)">
            <path
              d="M46.915 21.415L47.175 17.31"
              stroke="#76ADD3"
              strokeOpacity="0.69"
              strokeWidth="2"
            />
            <path
              d="M47.1748 17.31C47.1498 17.1183 47.1748 16.8667 47.2498 16.555C47.4298 15.81 47.2048 14.945 46.3173 14.86C42.4773 14.49 39.0915 13.8467 36.1598 12.93C35.9998 12.88 35.9123 12.7725 35.7423 12.7125C33.8673 12.045 32.0123 11.1875 30.3373 10.1075C28.7923 9.1075 27.5598 9.4425 25.9598 10.3625C21.9548 12.6642 17.6465 14.0617 13.0348 14.555C11.9073 14.675 11.1998 14.9375 10.3873 15.61C9.81732 16.08 9.72732 16.71 9.60232 17.4C9.53399 17.7733 9.55149 18.2533 9.65482 18.84C9.87482 20.075 9.77982 21.5225 9.86982 22.555C10.0398 24.4833 10.2223 26.4133 10.4173 28.345C10.6207 30.3583 10.9015 31.9458 11.2598 33.1075C12.6932 37.7508 15.4823 41.3833 19.6273 44.005C20.494 44.5517 22.5857 45.7842 25.9023 47.7025C26.4973 48.0475 27.0057 48.2608 27.4273 48.3425C28.9623 48.64 29.8898 48.28 31.3448 47.43C33.8323 45.975 36.7673 44.4125 38.7623 42.825C42.2207 40.0733 44.5557 36.4958 45.7673 32.0925C46.0923 30.9142 46.3173 29.2292 46.4423 27.0375C46.4973 26.0708 46.5748 25.1333 46.6748 24.225C46.7815 23.245 46.8615 22.3083 46.9148 21.415"
              stroke="#0F4C96"
              strokeOpacity="0.69"
              strokeWidth="2"
            />
            <path
              d="M47.1746 17.31C46.8696 17.325 46.5646 17.3625 46.2596 17.4225C45.903 17.4925 45.5996 17.525 45.3496 17.52C39.3346 17.375 33.7813 15.6958 28.6896 12.4825C28.5923 12.4215 28.4803 12.3883 28.3657 12.3865C28.2511 12.3848 28.1383 12.4145 28.0396 12.4725C23.303 15.2858 18.183 16.9458 12.6796 17.4525C12.5776 17.462 12.4835 17.5115 12.4179 17.5903C12.3523 17.669 12.3206 17.7704 12.3296 17.8725C12.5863 20.8358 12.8396 23.8 13.0896 26.765C13.2796 29.0267 13.518 30.6725 13.8046 31.7025C14.473 34.1092 15.613 36.2758 17.2246 38.2025C18.8646 40.165 20.8196 41.4675 23.0996 42.7725C24.7746 43.7308 26.4171 44.7192 28.0271 45.7375C28.113 45.7917 28.2121 45.8211 28.3136 45.8224C28.4151 45.8237 28.5149 45.7969 28.6021 45.745C30.2488 44.7617 31.9146 43.7717 33.5996 42.775C35.5313 41.6317 36.9063 40.6983 37.7246 39.975C40.2813 37.7133 42.0146 34.9142 42.9246 31.5775C43.173 30.6692 43.3688 29.3133 43.5121 27.51C43.6571 25.67 43.8396 23.8342 44.0596 22.0025C44.1971 20.8725 45.1396 20.2775 46.1346 20.8775C46.383 21.0258 46.643 21.205 46.9146 21.415"
              stroke="#478ED5"
              strokeWidth="2"
            />
            <path
              d="M26.6523 29.555C26.119 29.0067 25.5223 28.41 24.8623 27.765C23.9273 26.85 22.4873 26.6525 22.0148 28.135C21.9922 28.2061 21.9939 28.2819 22.0198 28.35C22.2015 28.8317 22.4956 29.2892 22.9023 29.7225C24.0806 30.9708 25.1965 32.0233 26.2498 32.88C27.2148 33.665 28.1898 32.505 28.7273 31.98C30.0106 30.7267 31.9973 28.7333 34.6873 26C35.3498 25.3275 35.9448 24.51 35.1498 23.6625C34.3473 22.81 33.2823 23.585 32.6498 24.2125C30.9181 25.9325 29.1265 27.715 27.2748 29.56C27.0665 29.7683 26.859 29.7667 26.6523 29.555Z"
              stroke="#C6E8FF"
              strokeWidth="2"
            />
            <path
              d="M27.775 0H29.4375C44.66 0.7475 56.3475 12.3875 57 27.64V29.5875C56.41 38.9858 52.4058 46.3683 44.9875 51.735C40.5225 54.965 35.3883 56.72 29.585 57H27.4325C18.8292 56.505 11.8525 53.0467 6.5025 46.625C2.3925 41.6917 0.225 35.8775 0 29.1825V27.595C0.6675 12.2625 12.48 0.6625 27.775 0ZM46.915 21.415L47.175 17.31C47.15 17.1183 47.175 16.8667 47.25 16.555C47.43 15.81 47.205 14.945 46.3175 14.86C42.4775 14.49 39.0917 13.8467 36.16 12.93C36 12.88 35.9125 12.7725 35.7425 12.7125C33.8675 12.045 32.0125 11.1875 30.3375 10.1075C28.7925 9.1075 27.56 9.4425 25.96 10.3625C21.955 12.6642 17.6467 14.0617 13.035 14.555C11.9075 14.675 11.2 14.9375 10.3875 15.61C9.8175 16.08 9.7275 16.71 9.6025 17.4C9.53417 17.7733 9.55167 18.2533 9.655 18.84C9.875 20.075 9.78 21.5225 9.87 22.555C10.04 24.4833 10.2225 26.4133 10.4175 28.345C10.6208 30.3583 10.9017 31.9458 11.26 33.1075C12.6933 37.7508 15.4825 41.3833 19.6275 44.005C20.4942 44.5517 22.5858 45.7842 25.9025 47.7025C26.4975 48.0475 27.0058 48.2608 27.4275 48.3425C28.9625 48.64 29.89 48.28 31.345 47.43C33.8325 45.975 36.7675 44.4125 38.7625 42.825C42.2208 40.0733 44.5558 36.4958 45.7675 32.0925C46.0925 30.9142 46.3175 29.2292 46.4425 27.0375C46.4975 26.0708 46.575 25.1333 46.675 24.225C46.7817 23.245 46.8617 22.3083 46.915 21.415Z"
              fill="#D9EDFB"
            />
            <path
              d="M47.1748 17.31C46.8698 17.325 46.5648 17.3625 46.2598 17.4225C45.9032 17.4925 45.5998 17.525 45.3498 17.52C39.3348 17.375 33.7815 15.6958 28.6898 12.4825C28.5925 12.4215 28.4805 12.3883 28.3659 12.3865C28.2512 12.3848 28.1385 12.4145 28.0398 12.4725C23.3032 15.2858 18.1832 16.9458 12.6798 17.4525C12.5778 17.462 12.4837 17.5115 12.4181 17.5903C12.3525 17.669 12.3208 17.7704 12.3298 17.8725C12.5865 20.8358 12.8398 23.8 13.0898 26.765C13.2798 29.0267 13.5182 30.6725 13.8048 31.7025C14.4732 34.1092 15.6132 36.2758 17.2248 38.2025C18.8648 40.165 20.8198 41.4675 23.0998 42.7725C24.7748 43.7308 26.4173 44.7192 28.0273 45.7375C28.1131 45.7917 28.2123 45.8211 28.3138 45.8224C28.4153 45.8237 28.5151 45.7969 28.6023 45.745C30.249 44.7617 31.9148 43.7717 33.5998 42.775C35.5315 41.6317 36.9065 40.6983 37.7248 39.975C40.2815 37.7133 42.0148 34.9142 42.9248 31.5775C43.1732 30.6692 43.369 29.3133 43.5123 27.51C43.6573 25.67 43.8398 23.8342 44.0598 22.0025C44.1973 20.8725 45.1398 20.2775 46.1348 20.8775C46.3832 21.0258 46.6432 21.205 46.9148 21.415C46.8615 22.3083 46.7815 23.245 46.6748 24.225C46.5748 25.1333 46.4973 26.0708 46.4423 27.0375C46.3173 29.2292 46.0923 30.9142 45.7673 32.0925C44.5557 36.4958 42.2207 40.0733 38.7623 42.825C36.7673 44.4125 33.8323 45.975 31.3448 47.43C29.8898 48.28 28.9623 48.64 27.4273 48.3425C27.0057 48.2608 26.4973 48.0475 25.9023 47.7025C22.5857 45.7842 20.494 44.5517 19.6273 44.005C15.4823 41.3833 12.6932 37.7508 11.2598 33.1075C10.9015 31.9458 10.6207 30.3583 10.4173 28.345C10.2223 26.4133 10.0398 24.4833 9.86982 22.555C9.77982 21.5225 9.87482 20.075 9.65482 18.84C9.55149 18.2533 9.53399 17.7733 9.60232 17.4C9.72732 16.71 9.81732 16.08 10.3873 15.61C11.1998 14.9375 11.9073 14.675 13.0348 14.555C17.6465 14.0617 21.9548 12.6642 25.9598 10.3625C27.5598 9.4425 28.7923 9.1075 30.3373 10.1075C32.0123 11.1875 33.8673 12.045 35.7423 12.7125C35.9123 12.7725 35.9998 12.88 36.1598 12.93C39.0915 13.8467 42.4773 14.49 46.3173 14.86C47.2048 14.945 47.4298 15.81 47.2498 16.555C47.1748 16.8667 47.1498 17.1183 47.1748 17.31Z"
              fill="#004BAA"
            />
            <path
              d="M47.1746 17.31L46.9146 21.415C46.643 21.205 46.383 21.0258 46.1346 20.8775C45.1396 20.2775 44.1971 20.8725 44.0596 22.0025C43.8396 23.8342 43.6571 25.67 43.5121 27.51C43.3688 29.3133 43.173 30.6692 42.9246 31.5775C42.0146 34.9142 40.2813 37.7133 37.7246 39.975C36.9063 40.6983 35.5313 41.6317 33.5996 42.775C31.9146 43.7717 30.2488 44.7617 28.6021 45.745C28.5149 45.7969 28.4151 45.8237 28.3136 45.8224C28.2121 45.8211 28.113 45.7917 28.0271 45.7375C26.4171 44.7192 24.7746 43.7308 23.0996 42.7725C20.8196 41.4675 18.8646 40.165 17.2246 38.2025C15.613 36.2758 14.473 34.1092 13.8046 31.7025C13.518 30.6725 13.2796 29.0267 13.0896 26.765C12.8396 23.8 12.5863 20.8358 12.3296 17.8725C12.3206 17.7704 12.3523 17.669 12.4179 17.5903C12.4835 17.5115 12.5776 17.462 12.6796 17.4525C18.183 16.9458 23.303 15.2858 28.0396 12.4725C28.1383 12.4145 28.2511 12.3848 28.3657 12.3865C28.4803 12.3883 28.5923 12.4215 28.6896 12.4825C33.7813 15.6958 39.3346 17.375 45.3496 17.52C45.5996 17.525 45.903 17.4925 46.2596 17.4225C46.5646 17.3625 46.8696 17.325 47.1746 17.31ZM26.6521 29.555C26.1188 29.0067 25.5221 28.41 24.8621 27.765C23.9271 26.85 22.4871 26.6525 22.0146 28.135C21.992 28.2061 21.9938 28.2819 22.0196 28.35C22.2013 28.8317 22.4955 29.2892 22.9021 29.7225C24.0805 30.9708 25.1963 32.0233 26.2496 32.88C27.2146 33.665 28.1896 32.505 28.7271 31.98C30.0105 30.7267 31.9971 28.7333 34.6871 26C35.3496 25.3275 35.9446 24.51 35.1496 23.6625C34.3471 22.81 33.2821 23.585 32.6496 24.2125C30.918 25.9325 29.1263 27.715 27.2746 29.56C27.0663 29.7683 26.8588 29.7667 26.6521 29.555Z"
              fill="#8DD1FF"
            />
            <path
              d="M26.6523 29.555C26.859 29.7667 27.0665 29.7683 27.2748 29.56C29.1265 27.715 30.9181 25.9325 32.6498 24.2125C33.2823 23.585 34.3473 22.81 35.1498 23.6625C35.9448 24.51 35.3498 25.3275 34.6873 26C31.9973 28.7333 30.0106 30.7267 28.7273 31.98C28.1898 32.505 27.2148 33.665 26.2498 32.88C25.1965 32.0233 24.0806 30.9708 22.9023 29.7225C22.4956 29.2892 22.2015 28.8317 22.0198 28.35C21.9939 28.2819 21.9922 28.2061 22.0148 28.135C22.4873 26.6525 23.9273 26.85 24.8623 27.765C25.5223 28.41 26.119 29.0067 26.6523 29.555Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1728_8059">
              <rect width="57" height="57" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <form
        className="w-full mt-[40px]"
        onSubmit={onSubmitt((values) =>
          onSubmit(
            {
              Attachement: values?.Attachement,
              registrationNumber: values?.registrationNumber,
            },
            setIsloading
          )
        )}
      >
        <Input
          disabled={isSwitchOn}
          label={"Registration number on the Order’s roll:"}
          placeholder="Add your numer"
          icon={
            <svg
              className="w-[24px] h-[24px] fill-[#333]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M3.00488 2.99979H21.0049C21.5572 2.99979 22.0049 3.4475 22.0049 3.99979V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979ZM20.0049 10.9998H4.00488V18.9998H20.0049V10.9998ZM20.0049 8.99979V4.99979H4.00488V8.99979H20.0049ZM14.0049 14.9998H18.0049V16.9998H14.0049V14.9998Z"></path>
            </svg>
          }
          {...getInputProps("registrationNumber")}
          // error={"dzdz"}
        />
        <Switch
          onChange={(e) => {
            setIsSwitchOn(e.currentTarget.checked);
            if (e.currentTarget.checked) {
              setFieldValue("registrationNumber", " ");
            } else {
              setFieldValue("Attachement", "");
            }
          }}
          id="10"
          className="mt-[10px]"
          label={
            "I do not have my registration number on the Order's roll. I submit a supporting file"
          }
          sx={{
            ["input:checked ~ label"]: {
              background: "#0049e0",
              borderColor: "#0049e0",
            },
            [".mantine-Switch-label"]: {
              color: "#0049e0",
              fontWeight: 500,
              textDecoration: "underline",
              cursor: "pointer",
              width: "100%",
              fontSize: "15px",
            },
          }}
        />
        {!currentFile && (
          <Dropzone
            disabled={!isSwitchOn}
            className={"mt-[30px]".concat(
              " ",
              !isSwitchOn ? "opacity-[.5] pointer-events-none" : ""
            )}
            multiple={false}
            onDrop={handleAddFile}
            onReject={(files) => {
              notifications.show({
                id: "load-data",
                color: "red",
                title: <span className="font-bold">Format not accepted !</span>,

                message: (
                  <span>
                    <b className="text-red-600 underline">
                      {files[0]?.file?.name}
                    </b>{" "}
                    this format file is not accepted
                  </span>
                ),
                icon: <IconX className="w-[25px] text-white" />,
                autoClose: 4000,
                styles: {
                  icon: {
                    width: "2.75rem",
                    height: "2.75rem",
                  },
                },
              });
            }}
            maxSize={3 * 1024 ** 2}
            accept={[
              MIME_TYPES.png,
              MIME_TYPES.pdf,
              MIME_TYPES.docx,
              MIME_TYPES.jpeg,
            ]}

            // {...props}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: rem(100), pointerEvents: "none" }}
              className="flex flex-col gap-0 items-center justify-center text-center"
            >
              <Dropzone.Accept>
                <UploadIconAccespted />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <UploadIconRejected />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <UploadIcon className="text-primary-normal" />
              </Dropzone.Idle>

              <div className=" text-[#667085] ">
                <Text>
                  <span className="text-primary-normal underline font-[500]">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </Text>
                <Text>PDF, DOCX, JPEG or PNG {"(max:30mb)"}</Text>
              </div>
            </Group>
          </Dropzone>
        )}

        {currentFile && (
          <div className="relative mt-[30px] file border rounded-md flex items-start gap-2 bg-white p-2 ">
            <div className="delete-action absolute top-0 right-0 m-2">
              <ActionIcon
                onClick={() => {
                  setcurrentFileLength(0);
                  setCurrentFile(null);
                  setFieldValue("Attachement", "");
                  setFieldValue("registrationNumber", " ");
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 4.99999H4.16667M4.16667 4.99999H17.5M4.16667 4.99999V16.6667C4.16667 17.1087 4.34226 17.5326 4.65482 17.8452C4.96738 18.1577 5.39131 18.3333 5.83333 18.3333H14.1667C14.6087 18.3333 15.0326 18.1577 15.3452 17.8452C15.6577 17.5326 15.8333 17.1087 15.8333 16.6667V4.99999H4.16667ZM6.66667 4.99999V3.33332C6.66667 2.8913 6.84226 2.46737 7.15482 2.15481C7.46738 1.84225 7.89131 1.66666 8.33333 1.66666H11.6667C12.1087 1.66666 12.5326 1.84225 12.8452 2.15481C13.1577 2.46737 13.3333 2.8913 13.3333 3.33332V4.99999M8.33333 9.16666V14.1667M11.6667 9.16666V14.1667"
                    stroke="#EF4836"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
              </ActionIcon>
            </div>
            <div className="icon">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="2"
                  width="32"
                  height="32"
                  rx="16"
                  fill="#0049E0"
                  fillOpacity="0.05"
                />
                <g clipPath="url(#clip0_1769_188)">
                  <path
                    d="M20.6666 20.6667L18 18M18 18L15.3333 20.6667M18 18V24M23.5933 22.26C24.2435 21.9055 24.7572 21.3446 25.0532 20.6658C25.3493 19.9869 25.4108 19.2288 25.2281 18.5111C25.0454 17.7934 24.629 17.157 24.0444 16.7023C23.4599 16.2476 22.7406 16.0005 22 16H21.16C20.9582 15.2195 20.5821 14.4949 20.0599 13.8807C19.5378 13.2664 18.8832 12.7786 18.1454 12.4537C17.4075 12.1289 16.6057 11.9756 15.8001 12.0053C14.9944 12.0349 14.206 12.2469 13.4941 12.6251C12.7822 13.0034 12.1652 13.5381 11.6897 14.1891C11.2142 14.84 10.8924 15.5904 10.7486 16.3836C10.6048 17.1768 10.6427 17.9924 10.8594 18.7688C11.0762 19.5453 11.4661 20.2626 12 20.8667"
                    stroke="#0049E0"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <rect
                  x="2"
                  y="2"
                  width="32"
                  height="32"
                  rx="16"
                  stroke="#0049E0"
                  strokeOpacity="0.1"
                  strokeWidth="4"
                />
                <defs>
                  <clipPath id="clip0_1769_188">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(10 10)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="w-full">
              <div className="name text-[#344054] font-[500] ">
                {currentFile?.name}
              </div>
              <div className="size text-[#667085] ">
                {(currentFile?.size * 0.000001).toFixed(2)} MB
              </div>
              <div className="flex justify-center items-center gap-4 ">
                <Progress
                  className="w-full"
                  styles={{
                    root: {
                      backgroundColor: "#e6edfc",
                      borderRadius: "30px",
                      height: "8px",
                    },
                    bar: {
                      backgroundColor: "#0049E0",
                    },
                  }}
                  value={currentFileLength}
                />
                <span>{currentFileLength}%</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex w-full items-center gap-2 mt-[30px] ">
          <Button
            type="button"
            onClick={previous}
            className="w-1/2 border bg-transparent text-primary-normal border-primary-normal bg-primary-light hover:bg-primary-light"
          >
            previous
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            disabled={
              (values?.registrationNumber == "" && !values?.Attachement) ||
              (values?.registrationNumber == " " && !values?.Attachement)
            }
            className=" w-1/2  bg-primary-normal text-white"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
