
export interface CountryResult {
    cty_name: string;
    country_code_alpha3: string;
}

export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: (CountryResult | OilPriceResult)[];
}


//
// "cty_name": "Afghanistan",
//     "country_code_alpha3": "AFG",
//     "year": 1932,
//     "oil_price_2000": 10.86086
export interface OilPriceResult {
    cty_name: string;
    country_code_alpha3: string;
    year: number;
    oil_price_2000: number;
}


export interface OilPriceDataPoint {
    year: number;
    oil_price_2000: number;
}


export interface ProduccionGasPetroleoDataPoint {
    year: number;
    oil_prod32_14: number;
    gas_prod55_14: number;
}


export interface EvolucionPrecioRealDataPoint {
    year: number;
    oil_price_2000: number;
    gas_price_2000_mboe: number;
}