import { useEffect, useState } from "react";
import { publicRequest } from "./requestMethods";

function FetchProductsHook() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importError, setImportError] = useState(null);
  useEffect(() => {
    setLoading(true);
    const getProducts = async () => {
      await publicRequest
        .get("categories/products")
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          setImportError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getProducts();
  }, []);
  return { data, loading, importError };
}

export default FetchProductsHook;
