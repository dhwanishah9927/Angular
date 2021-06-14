export interface Payment{
    id: number;
    userId: string;
    cardType: string;
    cardVendor: string;
    cardNumber: string;
    securityCode: string;
    expirationDate: string;
}