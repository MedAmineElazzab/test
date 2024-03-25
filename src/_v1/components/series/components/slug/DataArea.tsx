import { Serie } from "@/_v1/api/serie";
import { Description } from "./components";
import { Header } from "./index";

export default function DataArea({
  serie,
  scrollToComments,
}: {
  serie: Serie;
  scrollToComments: () => void;
}) {
  return (
    <>
      <div className="px-[20px]">
        <Header scrollToComments={scrollToComments} serie={serie} />
        <br />
        <Description serie={serie} />
      </div>
    </>
  );
}
