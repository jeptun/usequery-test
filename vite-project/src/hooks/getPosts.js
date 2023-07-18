import axios from "axios";

export function getPosts() {
  return axios
    .get("http://localhost:8000/posts", { params: { _sort: 5 } })
    .then(res => res.data);
}
