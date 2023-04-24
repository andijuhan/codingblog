import { gql } from '@apollo/client';

export const GET_POST_QUERY = gql`
   query getPosts {
      posts {
         data {
            attributes {
               Title
               slug
               Excerp
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
