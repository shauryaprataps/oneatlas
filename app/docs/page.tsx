import { productPages } from "@/config/content";
import { ProductPage } from "@/components/sections/product-page";

export default function DocsPage() {
  return <ProductPage content={productPages.docs} />;
}
