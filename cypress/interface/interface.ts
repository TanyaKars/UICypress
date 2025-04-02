export interface ContactData {
  validSubmission?: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  };
  invalidSubmission?: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  };
}


export interface UserData {
  emailConfirmation?: {
    confirmed: boolean;
    newEmailCandidate: string;
  };
  phoneConfirmation?: {
    confirmed: boolean;
    history: string[];
  };
  resetPassword?: {
    history: string[];
  };
  lastLogin?: {
    date: string;
  };
  shippingAddress?: {
    address: string | null;
    city: string | null;
    state: string | null;
    countryName: string | null;
    countryCode: string | null;
    zipCode: string | null;
  };
  stripe?: {
    subscriptions: string[];
  };
  _id: string;
  avatar?: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  codewarsId?: string | null;
  about?: string;
  goals?: string;
  groups?: object;
  courses?: string[];
  roles?: string[];
  active?: boolean;
  englishLevel?: string;
  tShirtSize?: string;
  deliveryAddress?: string;
  fulfilled?: boolean;
  host?: string | null;
  affiliates?: string[];
  subscriptions?: string[];
  products?: string[];
  googleId?: string;
  chatChannelsVisit?: string[];
  createdAt?: string;
  updatedAt?: string;
}

