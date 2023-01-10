import { api } from '@/utils/api';

const Service = {
  getShop: async (value: string,) => {
    const { data } = await api.get('', { params: { q: 'adidas', api: '<REQUIRED>', page: '1' } });
    return data;
  },
}
export default Service