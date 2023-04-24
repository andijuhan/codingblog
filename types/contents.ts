export interface IPosts {
   posts: {
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
               };
            };
         };
      };
      Excerp: string;
      Title: string;
      slug: string;
   };
}
