import { GET_DATA_FROM_SERVER } from "../Constant";

export function getDataFromServer(serverData) {
  return {
    type: GET_DATA_FROM_SERVER,
    payload: serverData,
  };
}
