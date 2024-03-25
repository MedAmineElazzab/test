import { Badge, Tooltip } from "@mantine/core";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { TagCard } from "..";

type Disease = {
  id: string;
  name: string;
  bgColor: string;
  color: string;
};

type Tag = {
  id: string;
  name: string;
  type: string;
  bgColor: string;
  color: string;
};

type Props = {
  tags?: Tag[];
  disease?: { disease: Disease }[];
};

const Tags: React.FC<Props> = ({ tags = [], disease = [] }: Props) => {
  const firstTDisease = disease?.slice(0, 1);
  const remainingTagsCount = disease ? disease.length - 1 : 0;
  const { push, query } = useRouter();

  const [isHoveredTags, setIsHoveredTags] = useState(false);
  const [currentIndexTags, setCurrentIndexTags] = useState<number>(0);

  const [isHoveredDisease, setIsHoveredDisease] = useState(false);
  const [currentIndexDisease, setCurrentIndexDisease] = useState<number>(0);

  console.log(tags, "tags");

  return (
    <div
      className="tags-details gap-[8px] flex-wrap pt-[16px] flex items-center "
      style={{ rowGap: "8px" }}
    >
      {tags?.map((item: Tag, index: number) => (
        <React.Fragment key={index}>
          <Tooltip label={item?.type} withArrow position="top">
            <Badge
              onClick={() => {
                if (item.type in query) {
                  const { [item.type]: removedItem, ...updatedQuery } = query;
                  if (query[item.type] == item.id) {
                    push({
                      pathname: "/v2/notes",
                      query: {
                        ...updatedQuery,
                        page: 1,
                      },
                    });
                  } else {
                    push({
                      pathname: "/v2/notes",
                      query: {
                        ...query,
                        [item.type]: item.type === item.id ? null : item.id,
                        page: 1,
                      },
                    });
                  }
                } else {
                  push({
                    pathname: "/v2/notes",
                    query: {
                      ...query,
                      [item.type]: item.type === item.id ? null : item.id,
                      page: 1,
                    },
                  });
                }
              }}
              className={`arkened-text capitalize cursor-pointer `}
              onMouseEnter={() => {
                setCurrentIndexTags(index);
                setIsHoveredTags(true);
              }}
              onMouseLeave={() => setIsHoveredTags(false)}
              style={
                isHoveredTags && currentIndexTags === index
                  ? {
                      background:
                        item.name == "Critique"
                          ? `#FEF0C780`
                          : item.name == "Alert"
                          ? "#FEE4E280"
                          : item.name == "Nouveau"
                          ? "#D1FADF80"
                          : item.type == "category"
                          ? "#E6EDFC90"
                          : `${item?.bgColor}60`,
                      color:
                        item.type == "category" ? "#00349F" : `${item?.color}`,
                      position: "relative",
                      height: "28px",
                    }
                  : {
                      background:
                        item.name == "Critique"
                          ? `#FEF0C7`
                          : item.name == "Alert"
                          ? "#FEE4E2"
                          : item.name == "Nouveau"
                          ? "#D1FADF"
                          : item.type == "category"
                          ? "#E6EDFC"
                          : `${item?.bgColor}80`,
                      color:
                        item.name == "Critique"
                          ? `#B54708`
                          : item.name == "Alert"
                          ? "#B42318"
                          : item.name == "Nouveau"
                          ? "#027A48"
                          : item.type == "category"
                          ? "#00349F"
                          : `${item?.color}`,
                      position: "relative",
                      height: "28px",
                    }
              }
            >
              <TagCard>
                <span className="max-w-[180px] truncate font-[500] text-[14px] leading-[20px]">
                  {item?.name}
                </span>
              </TagCard>
            </Badge>
          </Tooltip>
        </React.Fragment>
      ))}
      {firstTDisease?.map((item: { disease: Disease }, index: number) => (
        <React.Fragment key={index}>
          <Tooltip label={"Disease"} withArrow position="top">
            <Badge
              onClick={() => {
                if ("disease" in query) {
                  const { ["disease"]: removedItem, ...updatedQuery } = query;
                  if (query["disease"] == item.disease.id) {
                    push({
                      pathname: "/v2/notes",
                      query: {
                        ...updatedQuery,
                        page: 1,
                      },
                    });
                  } else {
                    push({
                      pathname: "/v2/notes",
                      query: {
                        ...query,
                        ["disease"]:
                          "disease" === item.disease.id
                            ? null
                            : item.disease.id,
                        page: 1,
                      },
                    });
                  }
                } else {
                  push({
                    pathname: "/v2/notes",
                    query: {
                      ...query,
                      ["disease"]:
                        "disease" === item.disease.id ? null : item.disease.id,
                      page: 1,
                    },
                  });
                }
              }}
              className="darkened-text capitalize cursor-pointer "
              onMouseEnter={() => {
                setCurrentIndexDisease(index);
                setIsHoveredDisease(true);
              }}
              onMouseLeave={() => setIsHoveredDisease(false)}
              style={
                isHoveredDisease && currentIndexDisease === index
                  ? {
                      background: `${item?.disease.bgColor}`,
                      color: `${item?.disease.color}75`,
                      border: `1px solid ${item?.disease.color}50`,
                      position: "relative",
                      height: "28px",
                    }
                  : {
                      background: `${item?.disease.bgColor}`,
                      color: `${item?.disease.color}`,
                      border: `1px solid ${item?.disease.color}75`,
                      position: "relative",
                      height: "28px",
                    }
              }
            >
              <TagCard>
                <span className="font-[500] max-w-[180px] truncate text-[14px] leading-[20px]">
                  {item?.disease.name}
                </span>
              </TagCard>
            </Badge>
          </Tooltip>
        </React.Fragment>
      ))}
      {remainingTagsCount > 0 && (
        <span className=" cursor-pointer w-[43px] h-[28px] flex items-center justify-center text-[#344054] text-[14px] font-[500] leading-[20px] bg-[#F2F4F7] rounded-[16px]">
          {`+ ${remainingTagsCount}`}
        </span>
      )}
    </div>
  );
};

export default Tags;
