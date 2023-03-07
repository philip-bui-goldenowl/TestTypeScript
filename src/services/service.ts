import { api, apiUpload } from '@/utils/api';

const Service = {
  getShop: async (value: string,) => {
    const { data } = await api.get('', { params: { q: 'adidas', api: '<REQUIRED>', page: '1' } });
    return data;
  },
  upLoadAvatar: async (data) => {
    console.log("afafafaf", data);

    const response = await apiUpload.post('upload', {
      body: data
    })
    return response
  }
}
export default Service