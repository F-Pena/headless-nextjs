import { HeroQuery, LogoWallQuery } from "@/types";
import { contentGqlFetcher } from "./fetch";

export const getClients = async () => {
    const query = `#graphql
        query Asset($where: AssetFilter) {
            assetCollection(where: $where) {
                items {
                    width
                    url
                    title
                    height
                }
            }
        }
    `;

    const data = await contentGqlFetcher<LogoWallQuery>({ query, variables: { where: { title_contains: 'client' } } });

    if(!data) {
        throw new Error('Failed to fetch clients data');
    }

    return data;
}

export const getHero = async () => {
  const query = `#graphql
        query HeroCollection {
            heroCollection {
                items {
                    preTitle
                    subtitle
                    title
                    callToActionsCollection {
                        items {
                            href
                            label
                        }
                    }
                }
            }
        }
    `;
  const data = await contentGqlFetcher<HeroQuery>({ query });
  
  if(!data) {
    throw new Error('Failed to fetch hero data');
  }

  return data;
};
