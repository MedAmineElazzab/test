import { Organization, api, setContext } from "@/api";
import {
  Box,
  GlobalModuleDetailedLayoutV2,
  OrganizationTabs,
} from "@/components";
import { InstitutionCardDetailed } from "@/components/global";
import { BACKEND_ROUTES, ModulesPathnames, ModulesTitles } from "@/enum";
import { Wording } from "@/lib";
import Error from "@/pages/_error";
import { GetServerSideProps } from "next";
interface InstitutionDetailedIndexProps {
  institution: Organization;
}

export default function InstitutionDetailedIndex({
  institution,
}: InstitutionDetailedIndexProps) {
  if (institution) {
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
      name,
      abbreviation,
      slug,
    } = institution;

    const items = [
      { title: ModulesTitles.INSTITUTIONS, href: ModulesPathnames.INSTITUTION },
      {
        title: name,
        href: ModulesPathnames.INSTITUTION + "/" + slug,
      },
    ];

    return (
      <GlobalModuleDetailedLayoutV2
        breadcrumbsItems={items}
        moduleType={ModulesTitles.INSTITUTIONS}
        title={slug}
      >
        <InstitutionCardDetailed
          id={id}
          name={`${name}`}
          abrv={abbreviation}
          note={note}
          imagePath={imagePath}
          isFollowed={isFollowed}
          followersCount={_count.OrganizationFollower}
          modulesCount={_count.ModulePartner}
          notesCount={_count.NoteOrganization}
          topFollowers={topFollowers || []}
          linkedin={linkedin}
          website={website}
        />
        <Box className="p-4 rounded-md bg-white">
          <OrganizationTabs about={about} id={id} />
        </Box>
      </GlobalModuleDetailedLayoutV2>
    );
  }
  return (
    <Error
      message={Wording.institutionNotFound}
      description={Wording.notfoudnDESC}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  setContext(context);
  const { query } = context;
  try {
    const { data } = await api.get<Organization>(
      BACKEND_ROUTES.INSTITUTION + "/" + query?.slug
    );
    return {
      props: {
        institution: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        institution: null,
      },
    };
  }
};
