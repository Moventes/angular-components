import { AddressDetails } from './address-details.type';


export interface Address {
  latitude: number;
  longitude: number;
  formattedAddress: string;
  googlePlaceId: string;
  addressDetails: AddressDetails;
}
