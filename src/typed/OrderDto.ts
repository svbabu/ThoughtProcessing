// OrderDto interface in TypeScript
export interface OrderDto {
  orderId: string;
  razorpayOrderId?: string;
  customerId: string;
  orderStatus: string;
  totalAmount: number;
  createdAt: string;
  updatedAt?: string;
  attempts?: number;
  receipt?: string;

  payments: PaymentDto[];
  items: OrderItemDTO[];
  shippingAddress: ShippingAddressDto;
  timeline: OrderHistoryDto[];
}

// Supporting DTOs
export interface PaymentDto {
          id: number;
            bank: string | null;          // can be null
            amount: number;
            status: string;
            orderId: string;
            razorpayOrderId: string;
            paymentId: string;
            razorpayPaymentId: string;
            method: string;
            transactionId?: string | null; // optional, may be null
            contact: string;               // phone numbers should be string, not number
            email: string;
            createdAt: string;
}

export interface OrderItemDTO {
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
}

export interface ShippingAddressDto {
  fullName: string;
  buildingName?: string;
  streetName?: string;
  city: string;
  state: string;
  pincode: string;
  mobileNumber: string;
}

export interface OrderHistoryDto {
  historyId?: string;
  orderId: string;
  status: string;
  statusTime: string;
  remarks?: string;
}
