import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      activeOrganization {
        role
        organization {
          id
          name
          type
        }
      }
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
    }
  }
`;

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
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
  }
`;
