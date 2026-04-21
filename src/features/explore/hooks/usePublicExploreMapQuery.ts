import { useQuery } from "@apollo/client/react";

import { PUBLIC_EXPLORE_MAP } from "../graphql/queries.gql";
import type { ExploreLocation } from "../types";

type PublicExploreMapResponse = {
  publicExploreMap: ExploreLocation[];
};

export const usePublicExploreMapQuery = (search: string) => {
  return useQuery<PublicExploreMapResponse>(PUBLIC_EXPLORE_MAP, {
    variables: { search: search || undefined },
    fetchPolicy: "no-cache",
  });
};
