// utils/getImageSrc.ts
import asusZenbook  from "@img/asuszenbook.png";
import { productImages } from "./productImages";

export function getImageSrc(item: { imageUrl?: string; productName: string }) {
  if (item.imageUrl) {
    // If backend already sends full URL
    if (item.imageUrl.startsWith("http")) {
      return item.imageUrl;
    }
    // If backend sends relative path
    return `http://localhost:8081/${item.imageUrl}`;
  }

  // Fallback: model or category image
  return productImages[item.productName] || asusZenbook ;
}