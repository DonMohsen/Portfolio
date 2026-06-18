import { revalidatePath, revalidateTag } from "next/cache";
import { BLOG_CACHE_TAG } from "./cache-tag";

export { BLOG_CACHE_TAG } from "./cache-tag";

export function revalidateBlogCache() {
  revalidateTag(BLOG_CACHE_TAG, {});
  revalidatePath("/fa/blogs");
  revalidatePath("/en/blogs");
}
