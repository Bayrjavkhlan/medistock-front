import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      staff {
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
      staff {
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
