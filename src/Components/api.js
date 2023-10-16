export const getProducts = () => {
    return new Promise((resolve) => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
    
      fetch("http://localhost:1337/api/products", requestOptions)
        .then(response => response.json())
        .then(result => {
          let data = result.data;
          resolve(data);
        })
        .catch(error => console.log('error', error));
    })
  }