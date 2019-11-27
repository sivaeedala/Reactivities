import axios, { AxiosResponse } from "axios";
import { IActivity } from "../Models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );

const responseBody = (response: AxiosResponse) => response.data;
const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(5000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(2000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(2000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(2000))
      .then(responseBody)
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activity"),
  details: (id: string) => requests.get(`/activity/${id}`),
  create: (activity: IActivity) => requests.post("/activity", activity),
  update: (activity: IActivity) =>
    requests.put(`/activity/${activity.id}`, activity),
  delete: (id: string) => requests.del(`activity/${id}`)
};

export default { Activities };
