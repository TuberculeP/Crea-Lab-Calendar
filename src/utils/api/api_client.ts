import { authentication, createDirectus, realtime, rest } from "@directus/sdk";

const apiClient = createDirectus("https://directus-ucmn.onrender.com")
  .with(authentication())
  .with(rest())
  .with(realtime());

export { apiClient };
