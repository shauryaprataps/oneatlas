import { productPages } from "@/config/content";
import { ProductPage } from "@/components/sections/product-page";

export default function PricingPage() {
  return <ProductPage content={productPages.pricing} />;
}
