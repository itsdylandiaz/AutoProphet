/** 
 * @class
 * @classdesc Class to easily generate URL for Alpha Vantage API
 */
export default class AlphaVantageUrlGenerator {

    /** @static @private Alpha Vantage API Key*/
    static #API_KEY = 'demo';

    /** @static Base URL for Alph Vantage API*/
    static BaseURL = 'https://www.alphavantage.co/'; 

    // Below are several static objects for converting the Alpha Vantage values necessary for the URL into a more human readable form
    
    /**
     * Alpha Vantage only accepts 1, 5, 15, 30 and 60 minute intervals. 
     * @static
    */
    static Interval = {
        '1': '1min',
        '5': '5min',
        '15': '15min',
        '30': '30min',
        '60': '60min'
    } 

    /**
     * Stores the string values needed for the different Alpha Vantage Functions
     * @static
     */
    static Function = {
        INTRADAY: 'TIME_SERIES_INTRADAY',
        DAILY: 'TIME_SERIES_DAILY',
        DAILY_ADJUSTED: 'TIME_SERIES_DAILY_ADJUSTED',
        WEEKLY: 'TIME_SERIES_WEEKLY',
        WEEKLY_ADJUSTED: 'TIME_SERIES_WEEKLY_ADJUSTED',
        MONTHLY: 'TIME_SERIES_MONTHLY',
        MONTHLY_ADJUSTED: 'TIME_SERIES_MONTHLY_ADJUSTED',
        QUOTE: 'GLOBAL_QUOTE'
    }

    /**
     * Stores the string values for the differnt data response types
     * @static
     */
    static DataType = {
        JSON: 'json',
        CSV: 'csv'
    }

    /**
     * Stores month values as numbers. This is because the API URL needs the months represented as numbers
     * @static
     */
    static Month = {
        JAN: '01',
        FEB: '02',
        MAR: '03',
        APR: '04',
        MAY: '05',
        JUN: '06',
        JUL: '07',
        AUG: '08',
        SEP: '09',
        OCT: '10',
        NOV: '11',
        DEC: '12',
    }

    /**
     * Stores the output size options
     * @static
     */
    static OutputSize = {
        COMPACT: 'compact',
        FULL: 'full'
    }

    /**
     * Generate the API URL
     * @static
     * @param {Object}                  params Object used to pass in all options necessary for Alpha Vantage Query
     * @param {AlphaVantage.Function}   params.function Alhpa Vantage Function Type
     * @param {String}                  params.symbol Ticker for the Security
     * @param {AlphaVantage.Interval}   params.interval Time Interval for queried data
     * @param {AlphaVantage.OutputSize} [params.outputsize] Type of output size
     * @param {AlphaVantage.DataType}   [params.datatype] Specify the return data type
     * @param {Boolean}                 [params.adjusted]
     * @param {Object}                  [params.month] Specify a specific month
     * @param {String}                  params.month.year
     * @param {AlphaVantage.Month}      params.month.month
     * @param {Boolean}                 [params.extend_hours] 
     * @returns {String} Url. Returns empty string if failure
     */
    static generateURL(params){ 

        // The Function, Symbol and Invterval parameters are required. If they are not supplied return an empty string
        if (!(params.function && params.symbol && params.interval)) return '';

        // The adjusted and extend_hours parameters are not required. If values are supplied they are converted from Boolean to string, if not their default values are set

        // If the value for adjusted is not set
        if (params.adjusted == undefined){

            // Set value to true as it is the default
            params.adjusted = 'true';

        } else {

            // Convert Boolean to String
            params.adjusted = params.adjusted ? 'true' : 'false';

        }

        // If the extend_hours value is not set
        if (params.extend_hours == undefined){

            // Set the value to true as it is the default
            params.extend_hours = 'true';

        } else {

            // Convert Boolean to String
            params.extend_hours = params.extend_hours ? 'true' : 'false';

        }

        // Check if the month object is provided
        if (params.month != undefined) {

            // Since the month value is an object, we need to check if the user provided the correct object
            // If the user did not provide a correct object, return an empty string
            if (!(params.month.year && params.month.month)) return '';

            // Change the value of the parameter to the correct string value for the API url
            params.month = `${params.month.year}-${params.month.month}`;
        }

        // Create string variable for the final API url
        let APIURL = '';

        // Add the Alpha Vantage url and start the querry
        APIURL += `${this.BaseURL}query?`;
      
        // For each key in the params object, add the value to the APIURL
        for (const [key, value] of Object.entries(params)){
            APIURL += `${key}=${value}&`;
        }

        // Add the API key to the end of the URL
        APIURL += `apikey=${this.#API_KEY}`;

        return APIURL;
    }
}

/*

Example input for finding the Intraday prices of IBM with an interval of 5 minutes for the month of december
const input = {
    function: AlphaVantageUrlGenerator.Function.INTRADAY,
    symbol: 'IBM',
    interval: AlphaVantageUrlGenerator.Interval[5],
    month: {
        month: AlphaVantageUrlGenerator.Month.DEC,
        year: '2023'
    }
}

console.log(AlphaVantageUrlGenerator.generateURL(input))
*/