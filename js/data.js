// =======================
// PROPERTY LISTINGS
// =======================
const listings = [{
        title: "Single Family Residence",
        price: 399900,
        address: "1640 Moose St, Pahrump, NV 89048",
        details: "3 Beds • 3 Baths • 1,910 Sq Ft",
        folder: "asset/house 1/1",
        img: "/asset/house 1/0aa7887ab296ef4f9b1e02a53f8f0a9b-o_a.webp",
        type: "house",
        bedrooms: 3,
        baths: 3
    },
    {
        title: "Cozy Affordable Home",
        price: 198500,
        address: "581 Montecito Dr, Pahrump, NV 89048",
        details: "2 Beds • 2 Baths • 1056 Sq Ft",
        folder: "asset/2/2",
        img: "/asset/2/4d04feb3a14a0458713e49f1669cff94-o_a.webp",
        type: "house",
        bedrooms: 2,
        baths: 2
    },
    {
        title: "Charming 2-Bed Property",
        price: 195000,
        address: "361 Montecito Dr, Pahrump, NV 89048",
        details: "2 Beds • 2 Baths • 1064 Sq Ft",
        folder: "asset/3/3",
        img: "/asset/3/0c522f578029ac21d17acf071b77a5fd-o_a.webp",
        type: "house",
        bedrooms: 2,
        baths: 2
    },
    {
        title: "Luxury 4-Bedroom Estate",
        price: 969000,
        address: "2851 Winchester Ave, Pahrump, NV 89048",
        details: "4 Beds • 4 Baths • 2877 Sq Ft",
        folder: "asset/4/4",
        img: "/asset/4/816dd8146b91636526675b086a54a946-o_a.webp",
        type: "villa",
        bedrooms: 4,
        baths: 4
    },
    {
        title: "Spacious Modern Home",
        price: 599900,
        address: "2061 Iroquois, Pahrump, NV 89048",
        details: "3 Beds • 3 Baths • 2802 Sq Ft",
        folder: "asset/5/5",
        img: "/asset/5/33ad5ef137e710d5201426ba45c1dda9-o_a.webp",
        type: "house",
        bedrooms: 3,
        baths: 3
    },
    {
        title: "Elegant 3-Bed Residence",
        price: 435000,
        address: "5528 Eleganza Ave, Pahrump, NV 89048",
        details: "3 Beds • 3 Baths • 2043 Sq Ft",
        folder: "asset/6/6",
        img: "/asset/6/ef05dbe9e5371832a9da302b4aa77f72-o_a.webp",
        type: "house",
        bedrooms: 3,
        baths: 3
    },
    {
        title: "40-Acre Land Opportunity",
        price: 575000,
        address: "370 N Bannavitch St, Pahrump, NV 89048",
        details: "0 Beds • 0 Baths • 40 Acres",
        folder: "asset/7/7",
        img: "/asset/7/b4e37140f6483f050f493cd4b8e549f9-o_a.webp",
        type: "land",
        bedrooms: 0,
        baths: 0
    },
    {
        title: "Move-In Ready Home",
        price: 214000,
        address: "61 Rudy Rd, Pahrump, NV 89048",
        details: "3 Beds • 2 Baths • 1264 Sq Ft",
        folder: "asset/house 8/8",
        img: "/asset/house 8/57d5bfea81d5eea4898a3f1dd1ad5225-o_a.png",
        type: "house",
        bedrooms: 3,
        baths: 2
    },
];

// =======================
// DROPDOWNS
// =======================
const propertyTypes = [{
        text: "House",
        value: "house"
    },
    {
        text: "Villa",
        value: "villa"
    },
    {
        text: "Land",
        value: "land"
    }
];

const locations = [
    "Bannavitch St, Pahrump",
    "Eleganza Ave, Pahrump",
    "Iroquois, Pahrump",
    "Moose St, Pahrump",
    "Montecito Dr, Pahrump",
    "Rudy Rd, Pahrump",
    "Winchester Ave, Pahrump"
];

// =======================
// BEDROOM OPTIONS
// =======================
const bedroomOptions = [{
        text: "Any Beds",
        value: "any"
    },
    {
        text: "1",
        value: 1
    },
    {
        text: "2",
        value: 2
    },
    {
        text: "3",
        value: 3
    },
    {
        text: "4",
        value: 4
    }
];

// =======================
// BATHROOM OPTIONS
// =======================
const bathroomOptions = [{
        text: "Any Baths",
        value: "any"
    },
    {
        text: "1",
        value: 1
    },
    {
        text: "2",
        value: 2
    },
    {
        text: "3",
        value: 3
    },
    {
        text: "4",
        value: 4
    }
];