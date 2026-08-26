export const propertyMeta = {
  categories: ["Commercial", "Warehouse", "Apartment", "House/Villa", "Plot"],
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
  // The valid beds range for each BHK value. min === max means beds is a
  // single fixed number (derived from BHK, not independently chosen);
  // max: null means "no upper bound" (only "5+ BHK" today).
  bedsRangeByBhk: {
    "1 BHK": { min: 1, max: 1 },
    "2 BHK": { min: 2, max: 2 },
    "3 BHK": { min: 3, max: 3 },
    "4 BHK": { min: 4, max: 4 },
    "5+ BHK": { min: 5, max: null },
  },
};
