export default function Realisation({
  icon,
  description,
}: {
  icon: JSX.Element;
  description: string | JSX.Element;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="icon bg-[#F5F8FE] w-[54px] h-[34px] flex justify-center items-center">
        {icon}
      </div>
      <div className="flex items-center gap-2">{description}</div>
    </div>
  );
}
