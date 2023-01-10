import { ApolloClient, ApolloError, DocumentNode, gql, NetworkStatus, ObservableQueryFields, OperationVariables, QueryHookOptions } from '@apollo/client';

export const GET_ORDER = gql`
query GetOrder {
  category {
    id
    image
    title
    banner
  }
  order {
    customer_id
    discount_price
    id
    order_date
    product
    purchase_price
    image
  }
}
`;

export const SEARCH_CATEGORY = gql`
query GetSearch($search: String!) {
  category(where:{
    title: {_ilike: $search}
  }) {
    id
    title
  }
}`

export const GET_CATEGORY = gql`
query GetOrder {
  category {
    id
    image
  }
}`
export const ADD_CATEGORY = gql`
  mutation AddCategory($image: String!, $banner: String!,$title: String!) {
    insert_category(objects: {
      image: $image, banner: $banner, title: $title
    }) {
      returning {
        title
      }
    }
  }
`;
export declare function useQuery<TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>,
): QueryResult<TData, TVariables>

export interface QueryResult<TData = any, TVariables = OperationVariables>
  extends ObservableQueryFields<TData, TVariables> {
  client: ApolloClient<any>;
  data: TData | undefined;
  error?: ApolloError;
  loading: boolean;
  networkStatus: NetworkStatus;
}