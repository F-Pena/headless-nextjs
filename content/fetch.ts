interface ContentGqlFetcherProps {
    query: string,
    variables?: any,
    preview?: boolean,
    revalidate?: number
}

export const contentGqlFetcher = async <T> ({ query, variables = {}, preview = false, revalidate }: ContentGqlFetcherProps): Promise<T | undefined> => {
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const accessToken = preview ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN;

    if (!spaceId) {
        throw new Error('CONTENTFUL_SPACE_ID environment variable is not set');
    }

    if (!accessToken) {
        throw new Error(`${preview ? 'CONTENTFUL_PREVIEW_ACCESS_TOKEN' : 'CONTENTFUL_ACCESS_TOKEN'} environment variable is not set`);
    }

    const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ query, variables })
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Contentful API Error:', {
            status: response.status,
            statusText: response.statusText,
            body: errorText
        });
        throw new Error(`Failed to fetch data from Contentful: ${response.status} ${response.statusText}`);
    }

    const { data, errors } = await response.json();

    if(errors) {
        console.error('GraphQL Errors:', errors);
        const errorMessages = errors.map((err: any) => err.message || JSON.stringify(err)).join(', ');
        throw new Error(`Failed to fetch data from Contentful: ${errorMessages}`)
    }

    return data as T
}