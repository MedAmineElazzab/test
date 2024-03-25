import { Badge, ButtonIcon, InfoIcon, PenIcon, TrashIcon } from "@/components";
import { clsx } from "@mantine/core";

interface CommentActionsProps {
  OnEdit: () => void;
  OnDelete: () => void;
  isVerified: boolean;
}

export function CommentActions({
  OnDelete,
  OnEdit,
  isVerified,
}: CommentActionsProps) {
  const handleDeleteClick = () => OnDelete();
  const handleEditClick = () => OnEdit();

  const classNames = clsx(
    "absolute transition-all before:absolute before:w-2 before:h-2 before:-bottom-1 before:rounded-sm before:left-1/2 before:-translate-x-1/2 before:bg-white before:rotate-45 opacity-0 top-0 right-1 flex py-2 px-3 actions rounded-md shadow-tooltip w-fit bg-white",
    "group-hover:-top-14 group-hover:opacity-100"
  );

  return (
    <div className="absolute left-0 top-0 group w-full p-4 h-full z-10 flex justify-center items-center">
      <div className={classNames}>
        <ButtonIcon onClick={handleDeleteClick}>
          <TrashIcon className="text-gray-500" />
        </ButtonIcon>
        <ButtonIcon onClick={handleEditClick}>
          <PenIcon className="text-gray-500" />
        </ButtonIcon>
      </div>
      {!isVerified && (
        <div className="shadow rounded-full">
          <Badge
            color="orange"
            variant="filled"
            size="lg"
            leftSection={<InfoIcon />}
          >
            Votre commentaire est en attente de modération.
          </Badge>
        </div>
      )}
    </div>
  );
}
