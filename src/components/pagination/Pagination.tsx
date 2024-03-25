import { scrollToTop } from "@/common";
import { usePagination } from "@mantine/hooks";
import { useRouter } from "next/router";
import { Button, LeftArrow, PaginationChild, RightArrow } from "..";
import { useEffect, useState } from "react";
interface PaginationProps {
  total: number;
  initialPage: number;
  siblings: number;
}
export function Pagination({ initialPage, siblings, total }: PaginationProps) {
  const { push, query } = useRouter();
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const pagination = usePagination({ total, initialPage, siblings });
  const handlePreviousClick = () => {
    scrollToTop();
    pagination.previous();
    push({
      query: {
        ...query,
        page: Number(currentPage) - 1,
      },
    });
  };
  const handleNextClick = () => {
    scrollToTop();
    pagination.next();
    push({
      query: {
        ...query,
        page: Number(currentPage) + 1,
      },
    });
  };
  const handlePageClick = (page: number) => {
    pagination.setPage(page);
    scrollToTop();
    push({
      query: {
        ...query,
        page,
      },
    });
  };
  useEffect(() => {
    if (query?.page != null && typeof query.page === "string") {
      setCurrentPage(Number(query.page));
      pagination.setPage(Number(query.page));
    }
  }, [query?.page]);
  if (pagination && pagination.range.length && total > 1) {
    return (
      <div className="flex justify-between items-center w-full">
        <div className="prev">
          <Button
            color="white"
            size="sm"
            leftIcon={<LeftArrow className="w-5 h-5" />}
            variant="outline"
            onClick={handlePreviousClick}
            disabled={pagination.active === 1}
          >
            Précédent
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {pagination.range.map((page, index) => {
            if (typeof page === "number") {
              return (
                <PaginationChild
                  key={index}
                  content={page}
                  active={pagination.active === page}
                  onClick={handlePageClick.bind(null, page)}
                />
              );
            }
          })}
        </div>
        <div className="next">
          <Button
            color="white"
            size="sm"
            rightIcon={<RightArrow className="w-5 h-5" />}
            variant="outline"
            onClick={handleNextClick}
            disabled={pagination.active === total}
          >
            Suivant
          </Button>
        </div>
      </div>
    );
  }
  return null;
}
