// typed/Product.ts
import latop from '@img/latop.png';
import mobile from '@img/mobile1.png';
import shoes from '@img/shoes.png';

export type Product = {
    selectedDate?: string | null
    deliveryDates: any[];
    isAvailableOnSelectedDate?: boolean; // ✅ add this
    price: number;
    title: string; // ✅ Add this line
    id: string;
    productName: string;
    description: string;
    originalPrice: number;
    saved:number;

    /*discountPercentage?: number;*/
    discountPercentage: number;
    appliedPrice: number;
    image: string; // ✅ Add this line
    /*imageSrc?:string;*/
    imageSrc:string;
    discount:number;
    navigateTo:string;
    offerLabel?: string; // ✅ Add this




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
        imageSrc: 'latop',
        discount: 25,
        navigateTo: '/laptops',
        title: "",
        id: "",
        /* description: "", */
        originalPrice: 50000,
        discountPercentage: 25,
        appliedPrice: 37500,

        offerLabel: 'New Year Deal',
        image: 'laptop',
        price: 0,
        deliveryDates: [],
        description: "High performance laptop with 16GB RAM",// ✅ added
        saved:0

    },
    {
        price: 0,
        productName: 'Mobile Phone',
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
        saved:0
    },
    {
        price: 0,
        productName: 'Shoes',
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
        saved:0
    },

];
export type BannerProps = {
    product: Product;
};
type ProductListProps = {
    products: Product[];
    category?: string;
    onAddToCart?: (product: Product) => void; // ✅ Add this
    imageUrl: string;
};
export type CartItem = Product & {
    id: number;
    name: string;
    productName:string;
    description?: string;
    price: number;
    originalPrice: number;
    discountPercentage: number;
    appliedPrice: number; // ✅ Must be a number
    image: string;
    offerLabel?: string;
    quantity: number;
    imageSrc?: string; // ✅ Add this ?line


    onRemove: (id: number) => void;
    /*addedAt?: Date;*/

};



export type CartItemType = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
     description?: string; // optional


};









