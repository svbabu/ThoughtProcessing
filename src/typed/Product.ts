// typed/Product.ts
import latop from '@img/latop.png';
import mobile from '@img/mobile1.png';
import shoes from '@img/shoes.png';

import asusZenbook from '@img/asuszenbook.png';
import dellXps from '@img/dellxps.png';
import macbookPro from '@img/macbookpro.png';
import hpSpectre from '@img/hpspectre.png';
import lenovoThinkpad from '@img/lenovothinkpad.png';
import { ShippingAddressDto } from '../typed/ShippingAddressDto';
export type Product = {

  selectedDate?: string | null
     /* deliveryDates: any[]; */
     deliveryDates?: string[];
    isAvailableOnSelectedDate?: boolean; // ✅ add this
    price: number;
    title?: string; // ✅ Add this line
    id: string;
    productName: string; // generic category (Laptop, Mobile, etc.)
    modelName?: string;   // // optional specific model (Dell XPS, MacBook Pro)  keep optional if backend sometimes omits it
    description?: string;
    originalPrice: number;
    saved?:number;
     basePrice?: number; // optional if backend sends it
     category?:string;
     name:string;
     /*discountPercentage?: number;*/
    discountPercentage: number;
    appliedPrice: number;
    image: string; // ✅ Add this lineimageSrc?:string;*/
    imageSrc:string;
    imageUrl?: string;
    images?: string[];       // ✅ multiple images
    discount?:number;
    navigateTo?:string;
    offerLabel?: string; // ✅ Add this
    // ✅ optional quantity
      quantity?: number;
       offerId?: string;   // ✅ add this
// ✅ Add these fields for specs
  brand?: string;
  processor?: string;
  ramSize?: string;
  storageCapacity?: string;
  operatingSystem?: string;
  videoCard?: string;
  display?: string;
  color?: string;


 /* id: string;
       productName: string;
       modelName?: string;
       title: string;
       description: string;

       // Pricing
       originalPrice: number;
       basePrice?: number;
       appliedPrice?: number;
       price: number;
       discountPercentage?: number;
       discount?: number;
       offerLabel?: string;
       saved: number;
       // Images/UI
         imageSrc: string;
         imageUrl?: string;
          image: string; // ✅ Add this lineimageSrc?:string;
         navigateTo: string;


         // Cart/availability
         deliveryDates: string[];
         selectedDate?: string | null;
         isAvailableOnSelectedDate?: boolean;
         // Specs
           brand?: string;
           processor?: string;
           ramSize?: string;
           storageCapacity?: string;
           operatingSystem?: string;
           videoCard?: string;
           display?: string;
           color?: string;
 */
};



export type PromoProduct = {
    productName: string;
    imageSrc: string;
    discount: number;
    navigateTo: string;
};
/*const defaultImage = mobile;*/



export const featuredProducts: Product[] = [
    {
        productName: 'Laptop',
        modelName:"",
        imageSrc: 'latop',
        discount: 25,
        navigateTo: '/laptops',
        title: "",
        id: "",
        name:"",
        /* description: "", */
        originalPrice: 50000,
        discountPercentage: 25,
        appliedPrice: 37500,

        offerLabel: 'New Year Deal',
        image: 'laptop',
        price: 0,
        deliveryDates: [],
        description: "High performance laptop with 16GB RAM",// ✅ added
        saved:0,
         quantity: 1

    },
    {
        price: 0,
        productName: 'Mobile Phone',
        name:"",
        modelName:"",
        imageSrc: 'mobile',
        discount: 20,
        navigateTo: '/mobiles',
        title: "",
        id: "",
        description: "",
        originalPrice: 50000,
        discountPercentage: 20,
        appliedPrice: 40000,
        image: 'mobile',
        offerLabel: 'Festival Offer',
        deliveryDates: [],
        selectedDate: undefined,
        saved:0,
         quantity: 1
    },
    {
        price: 0,
        productName: 'Shoes',
        name:"",
        modelName:"",
        imageSrc: shoes,
        discount: 15,
        navigateTo: '/shoes',
        title: "",
        id: "",
        description: "",
        originalPrice: 50000,
        discountPercentage: 15,
        appliedPrice: 42500,
        image: 'shoes',
        offerLabel: 'Weekend Sale',
        deliveryDates: [],
        selectedDate: undefined,
        saved:0,
         quantity: 1
    },

];
export type BannerProps = {
    product: Product;
};
type ProductListProps = {
    products: Product[];
    category?: string;
    onAddToCart?: (product: Product) => void; // ✅ Add this
     onViewMore?: (product: Product) => void; // ✅ new prop
     onToggleFavourite?: (product: Product) => void;
    imageUrl: string;
};
export type CartItem = Product & {
    id: number;
    name: string;
    productName:string;
    modelName?:string;
    description?: string;
    price: number;
    originalPrice: number;
    discountPercentage: number;
    appliedPrice: number; // ✅ Must be a number
    image: string;
    offerLabel?: string;
    quantity: number;
    imageSrc?: string; // ✅ Add this ?line
    imageUrl?: string;
    //deliveryDates?: string[];


    onRemove: (id: number) => void;
   addedAt?: Date
 basePrice?: number; // optional if backend sends it
 /* addedAt?: Date; */
// ✅ Add these fields for specs
  brand?: string;
  processor?: string;
  ramSize?: string;
  storageCapacity?: string;
  operatingSystem?: string;
  videoCard?: string;
  display?: string;
  color?: string;

};



export type CartItemType = {
    id: string;
    name: string;  // generic display name
    productName:string;  // category (Laptop, Mobile, etc.)
     modelName?:string; // specific model (Dell XPS, MacBook Pro)
    price: number;
    quantity: number;
    imageUrl: string;
    description?: string; // optional


};
const normalizeKey = (name: string) =>
  name.toLowerCase().replace(/\s+/g, ""); // "Dell XPS" → "dellxps"
// product.ts
export const imageMap: Record<string, string> = {
  "dellxps": dellXps,
   "macbookpro": macbookPro,
   "hpspectre": hpSpectre,
   "lenovothinkpad": lenovoThinkpad,   // ✅ fixed
   "asuszenbook": asusZenbook,

};
export type ProductOfferResponseDto = {
   id: number | null;
    productName: string;
    modelName: string;
    title:string;
    offerDescription: string;
    basePrice: number;
    appliedPrice: number;
    discountPercentage: number;
    productDescription: string;
    price:number;// ✅ add this

};
export type ProductWithSpecs = {
  id: string;
    modelName: string;
    brand: string;
    basePrice: number;
    description: string;
    imageUrl: string;
    ramSize: string;  // Specs
    processor: string;
    storageCapacity: string;
    operatingSystem: string;
    videoCard: string;
    display: string;
    color: string;

};

export const mapDtoToProduct = (dto: ProductOfferResponseDto): Product => ({
  id: dto.id?.toString() ?? Math.random().toString(),
  productName: dto.productName,
   modelName: dto.modelName,
   title:dto.modelName,
  description: dto.productDescription,     // ✅ product description for product card
  offerLabel: dto.offerDescription,        // ✅ offer description for banner
  /* title: dto.productName, */
  /* offerdescription: dto.offerDescription, */
  originalPrice: dto.basePrice,
  appliedPrice: dto.appliedPrice,
  discountPercentage: dto.discountPercentage,
  //price: dto.appliedPrice,
  image:imageMap[normalizeKey(dto.modelName)] || "/img/default-laptop.png",

  imageSrc: imageMap[normalizeKey(dto.modelName)] || "@img/asuszenbook.png",
  discount: dto.discountPercentage,
  navigateTo: "/laptops",
  deliveryDates: [],
  selectedDate: null,
  saved: 0,
  basePrice:dto.basePrice,
  price: dto.appliedPrice ?? dto.basePrice ?? 0,
  name:""

});
// Product.ts (frontend)

/* export type FavouriteProduct = {
  id: string;
  image: string;
  productName: string;
  description?: string;
  originalPrice: number;
  appliedPrice: number;
}; */

// If FavouriteProduct is basically the same as Product:
//export type FavouriteProduct = Product;


export type FavouriteProduct = Product & {
   // id: string;
     // productName: string;    // generic category (Laptop, Mobile, etc.)
      // modelName: string;   // ✅ optional, matches Product     // ✅ specific model (Dell XPS, MacBook Pro, etc.)
      //description?: string;
      //originalPrice: number;
      appliedPrice: number;
      //image?: string;        // raw image if provided
      imageSrc: string;      // ✅ resolved image for rendering
      //basePrice?: number;
     // discountPercentage?: number;
     // saved?: number;
      //deliveryDates?: string[];
      //selectedDate?: string | null;
     // onToggleFavourite?: (product: Product | FavouriteProduct) => void;
      //modelName?:string;
  //modelName:string;
  //addedAt?: string;
};
// dto.ts or products.ts
//1. Define DTO types in frontend
export type OrderItemDTO = {
    productId: string;
    productName?: string;
    modelName?: string;
    description?: string;
    imageUrl?: string;
    quantity: number;
    price: number;
    basePrice: number;
    appliedPrice: number;
    discountPercentage: number;
    offerId?: string;
};

/* export type ShippingAddressDto = {
   id?: string;
    userId: string;
    fullName: string;
    buildingName?: string;
    streetName?: string;
    city?: string;
    state?: string;
    pincode?: string;
    mobileNumber?: string;
    landmark?: string;
    addressType?: string;
    useDefault?: boolean;


    //id?: number;             // backend Long → TS number, optional
  //userId?: string;         // backend String → TS string, optional
   *//* fullName: string;
  mobileNumber: string;
  pincode: string;
  city: string;
  state: string;
  buildingName: string;
  streetName: string;
  landmark: string;
  addressType: string;
  useDefault: boolean; *//*
}; */

export type PaymentDto = {
  amount: number;
  status: string;
  method: string;
};

export type OrderRequestDTO = {
  orderId?: string;
  customerId: string;
  totalAmount: number;
  items: OrderItemDTO[];
  shippingAddress: ShippingAddressDto;
  payment: PaymentDto;
};

export type OrderResponseDTO = {
  orderId: string;
  customerId: string;
  orderStatus: string;
  createdAt: string;
  updatedAt?: string;
  totalAmount: number;
  items: OrderItemDTO[];
  recipientName?: string;
  address?: string;
  mobile?: string;
  paymentMethod?: string;
  receipt?: string;
  paymentDetails: PaymentDto;
   razorpayOrderId: string; // 👈 add this field
};

//2. Map Product → OrderItemDTO
export const mapProductToOrderItem = (product: Product): OrderItemDTO => ({
  productId: product.id,
    productName: product.productName ?? "",   // fallback
    modelName: product.modelName ?? "",
    description: product.description ?? "",
    imageUrl: product.imageSrc ?? "",
    quantity: product.quantity ?? 1,
    price: product.appliedPrice ?? 0,
    basePrice: product.originalPrice ?? 0,
    appliedPrice: product.appliedPrice ?? 0,
    discountPercentage: product.discountPercentage ?? 0,
    offerId: product.offerId ?? ""                  // use actual backend offerId, not label
    //offerId: product.offerLabel ?? ""
});
/*
const eligibleProducts: Product[] = selectedDate
  ? updatedCart.filter(item =>
      item.deliveryDates?.some(date => normalize(date) === normalize(selectedDate))
    ) as Product[]
  : updatedCart as Product[]; */
