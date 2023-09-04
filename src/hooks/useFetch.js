import { useState, useEffect } from "react";

const useFetch = (url,initialState) => {
  const [data, setData] = useState(initialState);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [url]);

  return [data];
};

export default useFetch;