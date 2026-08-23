export const propertyMeta = {
  categories: ["Apartment", "House/Villa", "Plot", "Commercial", "Warehouse"],
  statuses: ["For Rent", "For Sale", "Co Working", "Pre Leased"],
  furnishing: ["Unfurnished", "Semi-Furnished", "Fully Furnished"],
  bhk: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"],
  priceFrequencies: ["Monthly", "Annual"],
  // Statuses that bill recurringly, so they need a price frequency.
  priceFrequencyStatuses: ["For Rent", "Co Working"],
  statusesByCategory: {
    Apartment: ["For Rent", "For Sale", "Pre Leased"],
    "House/Villa": ["For Rent", "For Sale", "Pre Leased"],
    Plot: ["For Sale"],
    Commercial: ["For Rent", "For Sale", "Co Working", "Pre Leased"],
    Warehouse: ["For Rent", "For Sale", "Pre Leased"],
  },
  furnishingByCategory: {
    Apartment: ["Unfurnished", "Semi-Furnished", "Fully Furnished"],
    "House/Villa": ["Unfurnished", "Semi-Furnished", "Fully Furnished"],
    Plot: [],
    Commercial: ["Unfurnished", "Semi-Furnished", "Fully Furnished"],
    Warehouse: [],
  },
  bhkByCategory: {
    Apartment: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"],
    "House/Villa": ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"],
    Plot: [],
    Commercial: [],
    Warehouse: [],
  },
};
