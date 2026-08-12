export interface OrderItem {
  productId: string;
  productName: string;
  modelName :string;
  description: string;
  imageUrl?: string;   // or `image` depending on backend
  quantity: number;
  price:number;
  basePrice:number;
  appliedPrice: number;
  discountPercentage:number;
  offerId:number;
  mrp?: number;
  discount?: number;
  imageSrc?:string;
  //this.order = order;
}
export interface Payment{
id:number;
amount:number;
method:string;
    }

export interface ShippingAddress {
id:number;
userId:string;
fullName:string;
mobileNumber:number;
pincode:number;
 city:string;
state :string;
buildingName:string;
streetName:string;
landmark :string;
addressType:string;
useDefault:boolean
   // order = order;

}
export interface OrderHistory {
 historyId:number;
  orderId:string;   // use orderId instead of full Order
   status:string;
   statusTime:string;
  remarks:string;

    //OrderDto order;
    }

export interface Order {
  id: string;
 orderId:string;
 customerName: string;
 orderStatus: string;
 totalAmount: number;
 createdAt: string;   // LocalDateTime comes as ISO string in JSON
 updatedAt: string;
 attempts: number;
 receipt: string;
  //close orderdto fileds

  productName: string;
  price:number;
  image?: string;
  color?: string;

  address:string;
  city:string;
  state:string;
  pincode:number;
  mrp:number;
  discount:number;
  codCharges:number;
  shipping:string;
  platformFee:number;
  total:number;
  paymentMethod:string;
  mobile:number;
  placedDate: string;
  deliveredDate?: string;
 /*  timeline: {
      status: string;
     date: string;
      remarks: string;
// List<PaymentDto> payments;
//List<OrderItemDTO> items;
  // ShippingAddressDto shippingAddress;
// List<OrderHistoryDto> timeline;
    }[]; */
items: OrderItem[];   // ✅ add this
  shippingAddress?: ShippingAddress;
  timeline: OrderHistory[];   // ✅ use OrderHistory type
// Payments
  payments: Payment[];   // ✅ align payments with items & shipping
}
export interface OrderDto {
  orderId: string;
  customerId: string;
  orderStatus: string;
  totalAmount: number;
  createdAt: string;   // LocalDateTime comes as ISO string in JSON
  updatedAt: string;
  attempts: number;
  receipt: string;
}
export interface OrderHistoryDto {
 historyId:number;
  orderId:string;   // use orderId instead of full Order
   status:string;
   statusTime:string;
  remarks:string;

    //OrderDto order;
    }
export interface PaymentDto{
id:number;
amount:number;
method:string;
    }