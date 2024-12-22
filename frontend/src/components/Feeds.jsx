import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Feeds() {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: () => axios.get("/posts"),
  });


  return (
    <>
      {isFetching && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data && <p>{data.data.length}</p>}
    </>
  );
}
