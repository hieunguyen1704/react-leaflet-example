import axios from "axios";

const apiKey = "x7baztljil7z6LqHGkeoxoKU_FpllTZtUeNwlB_BdUk";
const urlApi = `https://discover.search.hereapi.com/v1/discover?at=10.7725104,106.6575988&limit=5&apikey=${apiKey}`;

export const searchOnMap = async (queryString) => {
  if(queryString){
    const searchApiUrl = urlApi + "&q=" + queryString;
    return new Promise((resolve, reject) => {
      axios
      .get(searchApiUrl)
      .then((response) => {
        const result = response.data.items
          .map((item) => {
            const { id, address, position } = item;
            return { id, address, position };
          })
          .filter((item) => item.address.countryName === "Việt Nam");
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  }
};
