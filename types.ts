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
