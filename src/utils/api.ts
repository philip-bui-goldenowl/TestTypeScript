import axios from 'axios';

const instancesInfo = [
  {
    name: 'api',
    secure: false,
    baseURL: 'https://taobao-api.p.rapidapi.com/api',
    headers: {
      // API_ACCESS_KEY: Env.API_ACCESS_KEY,
      'X-RapidAPI-Key': '1ba312e682msh7d1c65bb0194b27p154589jsn5569b3cd7f01',
      'X-RapidAPI-Host': 'taobao-api.p.rapidapi.com'
    },
  },
  {
    name: 'apiUpload',
    secure: false,
    baseURL: 'https://api.cloudinary.com/v1_1/dgputbexe/image/',
    headers: {
      // API_ACCESS_KEY: Env.API_ACCESS_KEY,
      //'X-RapidAPI-Key': '1ba312e682msh7d1c65bb0194b27p154589jsn5569b3cd7f01',
      //'X-RapidAPI-Host': 'taobao-api.p.rapidapi.com'
    },
  },
];

const createInstance = ({ baseURL, headers }: any) => {
  const instance = axios.create({
    baseURL,
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });



  instance.interceptors.response.use(
    (response: any) => response,
    ({ message, response: { data, status } }: any) => Promise.reject({ message, data, status }),
  );

  instance.interceptors.response.use(
    (response: any) =>
      response,
    async (error: any) => {
      console.log('error====>', error);

      if ((!!error && error?.status === 401) || (!!error && error?.status === 500)) {
        console.log('error?.status === 401');
        // storeDispatch(AuthActions.logOut());

        return;
      }
      Promise.reject(error);
      // if(error?)
    },
  );

  return instance;
};

const instances = instancesInfo.reduce((obj: any, instanceInfo) => {
  const key = instanceInfo.name;

  obj[key] = createInstance(instanceInfo);

  return obj;
}, {});



export const { api, apiUpload } = instances;
