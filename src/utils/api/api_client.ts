import { authentication, createDirectus, rest } from "@directus/sdk";

const apiClient = createDirectus("https://directus-ucmn.onrender.com")
  .with(authentication("json"))
  .with(rest());

export { apiClient };
