import { Expert, api, setContext } from "@/api";
import {
  Box,
  ExpertCardDetailed,
  ExpertTabs,
  GlobalModuleDetailedLayoutV2,
} from "@/components";
import { BACKEND_ROUTES, ModulesPathnames, ModulesTitles } from "@/enum";
import Error from "@/pages/_error";
import { GetServerSideProps } from "next";
interface ExpertDetailedIndexProps {
  expert: Expert;
}

export default function ExpertDetailedIndex({
  expert,
}: ExpertDetailedIndexProps) {
  if (expert) {
    const {
      note,
      id,
      about,
      imagePath,
      isFollowed,
      _count,
      topFollowers = [],
      linkedin,
      website,
      firstName,
      lastName,
      slug,
    } = expert;

    const items = [
      { title: ModulesTitles.EXPERTS, href: ModulesPathnames.EXPERT },
      {
        title: firstName + " " + lastName,
        href: ModulesPathnames.MODULE + "/" + slug,
      },
    ];

    const abrv =
      firstName != null &&
      firstName.length > 0 &&
      lastName != null &&
      lastName.length > 0
        ? firstName.slice(0, 1) + lastName.slice(0, 1)
        : "";
    return (
      <GlobalModuleDetailedLayoutV2
        breadcrumbsItems={items}
        moduleType={ModulesTitles.EXPERTS}
        title={slug}
      >
        <ExpertCardDetailed
          id={id}
          name={`${firstName} ${lastName}`}
          abrv={abrv}
          note={note}
          imagePath={imagePath}
          isFollowed={isFollowed}
          followersCount={_count.ExpertsFollowers}
          modulesCount={_count.ModuleExpert}
          notesCount={_count.NoteExpert}
          topFollowers={topFollowers || []}
          linkedin={linkedin}
          website={website}
        />
        <Box className="p-4 rounded-md bg-white">
          <ExpertTabs about={about} id={id} />
        </Box>
      </GlobalModuleDetailedLayoutV2>
    );
  }
  return (
    <Error
      message={"L'expert demandé n'est pas disponible."}
      description={"Veuillez mettre à jour votre recherche ou vos filtres"}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  try {
    const { data } = await api.get<Expert>(
      BACKEND_ROUTES.EXPERT + "/" + query?.slug
    );
    return {
      props: {
        expert: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        expert: null,
      },
    };
  }
};
