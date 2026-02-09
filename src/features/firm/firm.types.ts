// firm.types.ts


export interface Firm {
  firmId: number;
  firmName: string;
  firmCode?: string;
  address?: string;
  isActive: boolean;
  contactNumber?: string;
  contactPerson?: string;
  logoImagePath?: string | null;
  gstNumber?: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}



export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    error?: string | null;
    errors?: any;
}
