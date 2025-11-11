import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        name
        email
        phone
        roleKey
        hospital {
          name
        }
      }
      accessToken
      refreshToken
      accessTokenExpiresAt
    }
  }
`;
export const REFRESH_ACCESS_TOKEN = gql`
  mutation RefreshAccessToken($refreshToken: String!) {
    refreshAccessToken(refreshToken: $refreshToken) {
      user {
        id
        name
        email
        phone
        roleKey
        hospital {
          name
        }
      }
      accessToken
      refreshToken
      accessTokenExpiresAt
    }
  }
`;
