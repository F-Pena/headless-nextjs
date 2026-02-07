import 'server-only';
import { CustomerPostQuery, HeaderNavQuery, HeroQuery, LogoWallQuery } from "@/types";
import { contentGqlFetcher } from "./fetch";

export const getCustomerPost = async (slug: string) => {
    const query = `#graphql
        query CustomerPostCollection($where: CustomerPostFilter) {
            customerPostCollection(where: $where) {
                items {
                    title
                    slug
                    customer {
                        logo {
                            url
                            width
                            height
                        }
                        title
                    }
                    body {
                        json
                    }
                }
            }
        }
    `;

    const data = await contentGqlFetcher<CustomerPostQuery>({ query, variables: { where: { slug_contains: slug } } });

    if(!data) {
        throw new Error('Failed to fetch customer post data');
    }

    return data;
}

export const  getHeaderNav = async () => {
    const query = `#graphql
        query Query($where: NavigationFilter) {
            navigationCollection(where: $where) {
                items {
                linksCollection {
                    items {
                        label
                        href
                    }
                }
                name
                }
            }
        }
    `;

    const data = await contentGqlFetcher<HeaderNavQuery>({ query, variables: { where: { name_contains: 'Header' } } });

    if(!data) {
        throw new Error('Failed to fetch header nav data');
    }

    return data;
}

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
