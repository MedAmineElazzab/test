import { ArrowBottom, Box } from "@/components";
interface LoadMoreCommentsProps {
  onClick: () => void;
}
export function LoadMoreComments({ onClick }: LoadMoreCommentsProps) {
  return (
    <Box
      className="loadMore absolute h-20 flex justify-center items-center bottom-0 pb-2 w-full cursor-pointer bg-comment"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 pt-7 font-semibold text-gray-500 text-sm">
        Montre plus <ArrowBottom />
      </div>
    </Box>
  );
}
