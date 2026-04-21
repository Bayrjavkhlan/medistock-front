type ApolloGraphQLError = {
  message?: string;
};

type ApolloErrorLike = {
  graphQLErrors?: readonly ApolloGraphQLError[];
  networkError?: {
    result?: {
      errors?: ApolloGraphQLError[];
    };
  };
  cause?: ApolloErrorLike;
  message?: string;
};

export const getApolloErrorMessage = (
  error: unknown,
  fallbackMessage: string,
): string => {
  const apolloError = error as ApolloErrorLike | undefined;

  const graphQlMessage =
    apolloError?.graphQLErrors?.[0]?.message ??
    apolloError?.networkError?.result?.errors?.[0]?.message ??
    apolloError?.cause?.graphQLErrors?.[0]?.message;

  return graphQlMessage || apolloError?.message || fallbackMessage;
};
