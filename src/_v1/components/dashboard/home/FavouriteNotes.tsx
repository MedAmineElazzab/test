import { IconArrowRight } from "@tabler/icons-react";
import FavouriteNote from "./components/favouriteNotes/FavouriteNote";

export default function FavouriteNotes() {
  return (
    <div className="relative bg-[#fff] w-full h-full border rounded-md border-[#E2E8F0]">
      <div className="header header h-fit py-7 px-[25px]  flex justify-between items-center  ">
        <h2 className="font-[600] text-[17px]">Notes favoris</h2>
        <span className="bg-primary-normal/10 group  truncate gap-2 hover:underline flex items-center py-1 border border-primary-normal/5 hover:shadow transition-all px-4 rounded-[30px] text-[13px] font-[600] cursor-pointer text-primary-normal">
          Voir tout
          <IconArrowRight stroke={1.4} className="w-[19px] transition-all group-hover:translate-x-1" />
        </span>
      </div>
      <div className="FavouriteNotes flex flex-col gap-5  pb-[30px] px-[30px] h-[calc(100%-90px)] overflow-y-auto overflow-x-hidden">
        <FavouriteNote />
        <FavouriteNote />
        <FavouriteNote />
        <FavouriteNote />
        <FavouriteNote />
        <FavouriteNote />
        <FavouriteNote />
        <FavouriteNote />
        <FavouriteNote />

        <FavouriteNote />

      </div>
    </div>
  );
}
