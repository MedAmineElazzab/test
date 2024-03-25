export interface EventProps {
  time?: string;
  category?: string;
  title?: string;
  type?: string;
}
export default function EventElement({
  time,
  category,
  title,
  type,
}: EventProps) {
  return (
    <div className=" flex items-center justify-between">
      <div className="time pl-3 text-[#A098AE] text-[13px]">08.00 AM</div>
      <div className="details flex flex-col gap-2 w-[70%] border-l-4 rounded-[4px] pl-[13px] border-primary-normal ">
        <span className="category bg-primary-normal/10 text-primary-normal w-fit py-[3px] px-2   rounded text-[12px]">
          Event Medical
        </span>
        <h2 className="text-[15px] line-clamp-2 font-[500]">
          Carl Cox in project medical in project medical in project medical{" "}
        </h2>
      </div>
    </div>
  );
}
