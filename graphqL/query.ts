import { gql } from '@apollo/client';

export const SEARCH_POST_QUERY = gql`
   query searchPost($contains: String!) {
      posts(
         sort: "updatedAt:desc"
         pagination: { page: 1, pageSize: 6 }
         filters: { Title: { contains: $contains } }
      ) {
         data {
            attributes {
               Title
               slug
               Excerp
               updatedAt
               CoverImage {
                  data {
                     attributes {
                        alternativeText
                        formats
                     }
                  }
               }
            }
         }
      }
   }
`;

export const GET_POSTS_QUERY = gql`
   query getPosts($page: Int!, $pageSize: Int!) {
      posts(
         sort: "updatedAt:desc"
         pagination: { page: $page, pageSize: $pageSize }
      ) {
         meta {
            pagination {
               total
               pageCount
            }
         }
         data {
            attributes {
               Title
               slug
               Excerp
               updatedAt
               CoverImage {
                  data {
                     attributes {
                        alternativeText
                        formats
                     }
                  }
               }
            }
         }
      }
   }
`;

export const GET_POST_SINGLE_QUERY = gql`
   query getPost($slug: String!) {
      posts(filters: { slug: { eq: $slug } }) {
         data {
            attributes {
               Title
               slug
               Excerp
               Content
               CoverImage {
                  data {
                     attributes {
                        alternativeText
                        formats
                     }
                  }
               }
               Categories {
                  data {
                     attributes {
                        Name
                        Slug
                     }
                  }
               }
            }
         }
      }
   }
`;

export const GET_POSTS_BY_CATEGORY_QUERY = gql`
   query getPostByCategory($slug: String!, $page: Int!, $pageSize: Int!) {
      posts(
         sort: "updatedAt:desc"
         pagination: { page: $page, pageSize: $pageSize }
         filters: { Categories: { Slug: { eq: $slug } } }
      ) {
         meta {
            pagination {
               page
               pageCount
            }
         }
         data {
            attributes {
               Title
               slug
               Excerp
               updatedAt
               CoverImage {
                  data {
                     attributes {
                        alternativeText
                        formats
                     }
                  }
               }
            }
         }
      }
   }
`;

export const GET_SITE_SETTING_QUERY = gql`
   query getSiteSetting {
      setting {
         data {
            attributes {
               SiteTitle
               SiteDescription
               FrontEndUrl
            }
         }
      }
   }
`;

export const GET_POST_SLUGS_QUERY = gql`
   query getPostSlugs {
      posts(sort: "updatedAt:desc") {
         data {
            attributes {
               slug
               updatedAt
            }
         }
      }
   }
`;

export const GET_CATEGORY_QUERY = gql`
   query getCategorySlugs {
      categories {
         data {
            attributes {
               Name
               Slug
            }
         }
      }
   }
`;
