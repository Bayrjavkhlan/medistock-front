import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        name
        email
        phone
        isPlatformAdmin
        memberships {
          role
          organization {
            id
            name
            type
          }
        }
      }
      accessToken
      refreshToken
      accessTokenExpiresAt
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      message
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($input: VerifyOtpInput!) {
    verifyOtp(input: $input) {
      message
    }
  }
`;

export const RESEND_OTP = gql`
  mutation ResendOtp($input: ResendOtpInput!) {
    resendOtp(input: $input) {
      message
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
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
        isPlatformAdmin
        memberships {
          role
          organization {
            id
            name
            type
          }
        }
      }
      accessToken
      refreshToken
      accessTokenExpiresAt
    }
  }
`;

export const SELECT_ORGANIZATION = gql`
  mutation SelectOrganization($orgId: String!) {
    selectOrganization(orgId: $orgId) {
      role
      organization {
        id
        name
        type
      }
    }
  }
`;
