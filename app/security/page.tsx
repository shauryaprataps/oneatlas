import { productPages } from "@/config/content";
import { ProductPage } from "@/components/sections/product-page";

export default function SecurityPage() {
  return <ProductPage content={productPages.security} />;
}
