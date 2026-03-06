export const API_ROUTES = {
  STATES: "/states",
  CITIES: "/cities",
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
  },

  FIRMS: "/firms",
  CATEGORIES: "/categories",

  // Add Authebntication routes here in the future
  MILLS: "/mills",
  MILL_DETAILS: (id: number) => `/mills/mill-details/${id}`,

  COMPANIES: "/companies",
  COMPANY_DETAILS: (id: number) => `/companies/company-details/${id}`,

    PRODUCTS: "/products",
    PRODUCT_DETAILS: (id: number) => `/products/${id}/details`,
    KYC: "/kyc-documents/verification",
    KYC_UPDATE: "/kyc-documents/status",
    KYC_UPLOADS: (id: number) => `/kyc-documents/${id}`,
    PRODUCT_IMAGES: "/ProductImages",
    SELLING_PRICES: "/selling-prices",
    ORDERS: "/orders",

    STOCK_TRANSACTIONS: "/StockTransactions",
    STOCK_ADJUSTMENTS: "/StockAdjustments",
    PRODUCT_BATCHES: "/ProductBatches",
    PRODUCT_STOCKS: "/ProductStocks",
    SALES: "/sales",
    // PRODUCT_DETAILS: (id: number) => `/products/${id}/details`,
};
