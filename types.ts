export type HeaderNavQuery = {
  navigationCollection: {
    items: {
      name: string;
      linksCollection: {
        items: {
          label: string;
          href: string;
        }[];
      };
    }[];
  };
}

export type LogoWallQuery = {
  assetCollection: {
    items: {
        width: number;
        height: number;
        url: string;
        title: string;
    }[];
  };
}

export type HeroQuery = {
  heroCollection: {
    items: {
      preTitle: string;
      subtitle: string;
      title: string;
      callToActionsCollection: {
        items: {
          href: string;
          label: string;
        }[];
      };
    }[];
  };
};

export type CustomerPostQuery = {
  customerPostCollection: {
    items: {
      title: string;
      slug: string;
      customer: {
        logo: {
          url: string;
          width: number;
          height: number;
        };
        title: string;
      };
      body: {
        json: JSON;
      }
    }[];
  };
}