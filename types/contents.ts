export interface IPosts {
   posts: {
      meta: {
         pagination: {
            total: number;
            pageCount: number;
         };
      };
      data: IPostAttributes[];
   };
}

export interface IPostAttributes {
   attributes: {
      CoverImage: {
         data: {
            attributes: {
               alternativeText: string;
               formats: {
                  thumbnail: {
                     url: string;
                  };
                  medium: {
                     url: string;
                  };
                  small: {
                     url: string;
                  };
               };
            };
         };
      };
      Excerp: string;
      Title: string;
      slug: string;
   };
}

export interface IPostSingleAttributes {
   attributes: {
      CoverImage: {
         data: {
            attributes: {
               alternativeText: string;
               formats: {
                  thumbnail: {
                     url: string;
                  };
                  medium: {
                     url: string;
                  };
               };
            };
         };
      };
      Excerp: string;
      Title: string;
      slug: string;
      Content: string;
      Categories: {
         data: ICategoriesAttributes[];
      };
   };
}

export interface ICategoriesAttributes {
   attributes: {
      Name: string;
      Slug: string;
   };
}
