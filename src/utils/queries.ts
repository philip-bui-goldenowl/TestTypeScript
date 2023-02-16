import { ApolloClient, ApolloError, DocumentNode, gql, NetworkStatus, ObservableQueryFields, OperationVariables, QueryHookOptions } from '@apollo/client';

export const GET_ORDER = gql`
query GetOrder($limit: Int = 5) {
  order(limit: $limit) {
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
    title,
    image
  }
}`

export const GET_CATEGORY = gql`
query GetCategory {
  category {
    id
    image
    title
    banner
  }
}`
export const LOGIN_USER = gql`
query LOGIN($email: String!, $pass: String!) {
  user(where: {email: {_like: $email}, pass: {_like: $pass}}) {
    id
    name
  }
}`
export const GET_USER = gql`
query GetUser($_id: Int!) {
  user(where: {id: {_eq: $_id}}) {
    id
    name,
    phone,
    email,
    avatar
  }
}
`
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
export const UPDATE_CATEGORY = gql`
mutation UpdateCategory($id: Int!, $title: String!) {
  update_category_by_pk(pk_columns: {
    id: $id
  }, _set: {
    title: $title
  }) {
    title
    image
  }
}
`
export const UPDATE_PASSWORD = gql`
mutation UpdatePassword($id: Int!, $pass: String!){
  update_user_by_pk(pk_columns: {
    id:$id
  }, _set: {
    pass: $pass,
  }){
    id
  }
}
`
export const UPDATE_PROFILE = gql`
mutation UpdateProfile($id: Int!, $phone: Int!){
  update_user_by_pk(pk_columns: {
    id:$id
  }, _set: {
    phone: $phone,
  }){
    id,
    name,
    email,
    phone
  }
}
`
export const UPDATE_AVATAR = gql`
mutation UpdateProfile($id: Int!, $avatar: String!){
  update_user_by_pk(pk_columns: {
    id:$id
  }, _set: {
    avatar: $avatar,
  }){
    id,
    name,
    email,
    phone,
    avatar
  }
}
`
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