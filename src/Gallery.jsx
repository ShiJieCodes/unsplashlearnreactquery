import axios from "axios";
import { useGlobalContext } from "./context";
import { useQuery } from "@tanstack/react-query";

const url = `https://api.unsplash.com/search/photos/?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    },
  });
  // console.log(response);
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }
  const results = response.data.results;
  // console.log(results);
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {results.map(({ id, alt_description: alt, urls }) => {
        return <img key={id} src={urls?.regular} alt={alt} className="img" />;
      })}
    </section>
  );

  // return (
  //   <section className="image-container">
  //     {response.data.map(({ id, alt_description: alt, urls }) => {
  //       return (
  //         <img src={urls?.regular} key={id} alt={alt} className="img"></img>
  //       );
  //     })}
  //   </section>
  // );
};
export default Gallery;
