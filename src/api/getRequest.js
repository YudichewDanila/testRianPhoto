import axios from 'axios';

const baseUrl = 'https://fakestoreapi.com/';

const getRequest = async (params)=>{
    let result;
   await axios.get(baseUrl+params).then(async(response) => {
        result = await response.data;
      }).catch(error => {
        result = [{
          id:1,
          title:'Тестовые данные 1',
          price:'100',
          rating: {
            rate: '1',
            count: '10',
          },},
          {
            id:2,
            title:'Тестовые данные 2',
            price:'200',
            rating: {
              rate: '2',
              count: '10',
            },},
            {
              id:3,
              title:'Тестовые данные 3',
              price:'300',
              rating: {
                rate: '3',
                count: '10',
              },},
        ];
      });
      return result;
}

export default getRequest;