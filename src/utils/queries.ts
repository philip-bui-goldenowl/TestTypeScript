import { ApolloClient, ApolloError, DocumentNode, gql, NetworkStatus, ObservableQueryFields, OperationVariables, QueryHookOptions } from '@apollo/client';

export const GET_ORDER = gql`
query GetOrder($limit: Int = 5) {
  order(limit: $limit,order_by: {id: desc}) {
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
  order(where:{
    product: {_ilike: $search}
  }) {
    customer_id
    discount_price
    id
    order_date
    product
    purchase_price
    image
  }
}`
export const FILTER_PRODUCT = gql`
query filterProduct($where: order_bool_exp){
  order(where:$where) {
      customer_id
      discount_price
      id
      order_date
      product
      purchase_price
      image
    }
  
}
`
export const FILTER_COLOR_PRODUCT = gql`
query filterProduct($filter: String){
  order(where:{
    color: {_eq: $filter}
    }) {
      customer_id
      discount_price
      id
      order_date
      product
      purchase_price
      image
    }
  
}
`

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
    name, 
    phone,
    email,
    avatar,
    birthday
  }
}`
export const REGISTER_USER = gql`
mutation REGISTER($name: String!, $email: String!, $pass: String!) {
  insert_user(objects: {name: $name, email: $email, pass: $pass}) {
    returning {
    id
    name, 
    phone,
    email,
    avatar,
    birthday
    }
  }
}`
export const SAVE_USER = gql`
mutation InsertUser($name: String!, $email: String!) {
  insert_user(objects: {name: $name, email: $email, pass: "123"}) {
    returning {
    id
    name, 
    phone,
    email,
    avatar,
    birthday
    }
  }
}`
export const GET_USER = gql`
query GetUser($_id: Int!) {
  user(where: {id: {_eq: $_id}}) {
    id
    name,
    phone,
    email,
    avatar,
    birthday
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
mutation UpdateProfile($id: Int!, $phone: Int!, $email: String!,$birthday: String! ){
  update_user_by_pk(pk_columns: {
    id:$id
  }, _set: {
    phone: $phone,
    email: $email,
    birthday: $birthday
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
export const GET_PRODUCT_WITH_ID = gql`
query getProductWithId($_id: Int!) {
  order(where: {id: {_eq: $_id}}) {
    customer_id
    discount_price
    id
    order_date
    product
    purchase_price
    image,
    color,
    size
  }
}
`
export const UPDATE_PHOTO_PRODUCT = gql`
mutation UpdateProtoProduct($id: Int!, $image: String!){
  update_order_by_pk(pk_columns: {
    id:$id
  }, _set: {
    image: $image,
  }){
    customer_id
    discount_price
    id
    order_date
    product
    purchase_price
    image,
    color,
    size
  }
}
`
export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($id: Int!, $size: String!, $color: String!){
  update_order_by_pk(pk_columns: {
    id:$id
  }, _set: {
    size: $size,
    color: $color,
  }){
    customer_id
    discount_price
    id
    order_date
    product
    purchase_price
    image,
    color,
    size
  }
}
`
export const ADD_PRODUCT = gql`
  mutation AddProduct($image: String!,$product: String!) {
    insert_order(objects: {
      image: $image, product: $product
    }) {
      returning {
        product
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