/*
 * All of the current SEC EDGAR APIs are callable through the following functions.
 *
 * For more information about the APIs see: https://www.sec.gov/edgar/sec-api-documentation 
 * /

/*
 * "This JSON data structure contains metadata such as current name, former name, and stock exchanges and ticker 
 * symbols of publicly-traded companies. The object’s property path contains at least one year’s of filing or to 
 * 1,000 (whichever is more) of the most recent filings in a compact columnar data array. If the entity has additional 
 * filings, files will contain an array of additional JSON files and the date range for the filings each one contains."
 *  
 * @param {string} cik CIK number of the desired entity.
 * @return {object} The desired entity's current filling history.
 */
async function fetchSubmission(cik) {
    let response = await fetch(`https://data.sec.gov/submissions/CIK${cik}.json`);
    return (await response).json();
}

/*
 * "The company-concept API returns all the XBRL disclosures from a single company (CIK) and concept (a taxonomy and tag) 
 * into a single JSON file, with a separate array of facts for each units on measure that the company has chosen to disclose 
 * (e.g. net profits reported in U.S. dollars and in Canadian dollars)." 
 * 
 * @param {string} cik CIK number of the desired entity.
 * @return {object} The desired entity's XBRL disclosures and concept.
 */
async function fetchCompanyConcept(cik) {
    let response = await fetch(`https://data.sec.gov/api/xbrl/companyconcept/CIK${cik}/us-gaap/AccountsPayableCurrent.json`);
    return (await response).json();
}

/*
 * "This API returns all the company concepts data for a company into a single API call."
 * 
 * @param {string} cik CIK number of the desired entity.
 * @return {object} The desired entity's company concepts.
 */
async function fetchCompanyFacts(cik) {
    let response = await fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`);
    return (await response).json();    
}

/*
 * The xbrl/frames API aggregates one fact for each reporting entity that is last filed that most closely fits the calendrical period requested. 
 * This API supports for annual, quarterly and instantaneous data. Where the units of measure specified in the XBRL contains a numerator 
 * and a denominator, these are separated by “-per-” such as “USD-per-shares”. Note that the default unit in XBRL is “pure”.
 * The period format is CY#### for annual data (duration 365 days +/- 30 days), CY####Q# for quarterly data (duration 91 days +/- 30 days), 
 * and CY####Q#I for instantaneous data. Because company financial calendars can start and end on any month or day and even change in length 
 * from quarter to quarter to according to the day of the week, the frame data is assembled by the dates that best align with a calendar quarter 
 * or year. Data users should be mindful different reporting start and end dates for facts contained in a frame."
 * 
 * @param {number} year The year for the requested data data.
 * @param {number} quarter The quarter of the year for the requested data.
 * @return {object} All the facts for each reporting entity for the given time frame.
 */
async function fetchFrames(year, quarter) {
   let response = await fetch(`https://data.sec.gov/api/xbrl/frames/us-gaap/AccountsPayableCurrent/USD/CY${year}Q${quarter}I.json`);
   return (await response).json();    
}

async function test() {
    let submissionData = await fetchSubmission('0001018724');
    console.log(submissionData);
}

test();