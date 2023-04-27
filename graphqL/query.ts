import { gql } from '@apollo/client';

export const GET_POST_QUERY = gql`
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
