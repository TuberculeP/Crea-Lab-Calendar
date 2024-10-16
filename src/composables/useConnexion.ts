import { ref } from "vue";
import { apiClient } from "../utils/api/api_client";

const useConnexion = () => {
  const isConnected = ref(false);

  const connect = async (token: string) => {
    await apiClient.setToken(token);
  };
  return { isConnected, connect };
};

export default useConnexion;
