import { productPages } from "@/config/content";
import { ProductPage } from "@/components/sections/product-page";

export default function BlogPage() {
  return <ProductPage content={productPages.blog} />;
}
