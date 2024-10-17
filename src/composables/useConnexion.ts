import { ref } from "vue";
import { apiClient } from "../utils/api/api_client";

const isConnected = ref(false);
const onDirectusConnectedCallbacks = ref<(() => void)[]>([]);

export const useConnexion = () => {
  const onDirectusConnected = (callback: () => void) => {
    onDirectusConnectedCallbacks.value.push(callback);
  };

  const connect = async (token: string) => {
    await apiClient.setToken(token);
    isConnected.value = true;
    onDirectusConnectedCallbacks.value.forEach((callback) => callback());
  };

  const localTestConnect = async () => {
    console.time("get_token");
    const result =
      (await apiClient.login(
        import.meta.env.VITE_DIRECTUS_TEST_EMAIL,
        import.meta.env.VITE_DIRECTUS_TEST_PASSWORD
      )) || {};
    const { access_token } = result;
    if (!access_token) {
      console.error("Failed to login");
      return;
    }
    console.timeEnd("get_token");
    console.time("login");
    await connect(access_token);
    console.timeEnd("login");
  };

  return { onDirectusConnected, isConnected, connect, localTestConnect };
};
