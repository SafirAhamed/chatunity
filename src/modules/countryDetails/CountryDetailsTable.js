import React, { useEffect, useState } from 'react'
import './CountryDetailsTable.scss'

export const CountryDetailsTable = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        alpha2Code: '',
        alpha3Code: '',
        dialCode: '',
        currency: '',
        region: '',
        regionTags: ''
    });

    // Function to fetch country data
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                setCountries(data);
                setFilteredCountries(data); // Initialize filtered countries with all data
            })
            .catch(error => {
                console.error('Error fetching country data:', error);
            });
    }, []);

    // Function to handle filter input changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    // Function to filter countries based on current filters
    useEffect(() => {
        const filtered = countries?.filter(country =>
            country.name.common?.toLowerCase()?.includes(filters.name?.toLowerCase()) &&
            country.cca2?.toLowerCase()?.includes(filters.alpha2Code?.toLowerCase()) &&
            country.cca3?.toLowerCase()?.includes(filters.alpha3Code?.toLowerCase()) &&
            (country.idd && country.idd.root?.toLowerCase()?.includes(filters.dialCode?.toLowerCase())) &&
            (country.currencies ? Object.keys(country.currencies).some(code =>
                country.currencies[code].name?.toLowerCase()?.includes(filters.currency?.toLowerCase())
            ) : true) &&
            country.region?.toLowerCase()?.includes(filters.region?.toLowerCase()) &&
            getRegionTags(country.name.common)?.toLowerCase()?.includes(filters.regionTags?.toLowerCase())
        );
        setFilteredCountries(filtered);
    }, [countries, filters]);

    const regionMappings = {
        // Latin America (LATAM)
        'Mexico': 'LATAM',
        'Brazil': 'LATAM',
        'Argentina': 'LATAM',
        'Chile': 'LATAM',
        'Colombia': 'LATAM',
        'Peru': 'LATAM',
        'Ecuador': 'LATAM',
        'Bolivia': 'LATAM',
        'Paraguay': 'LATAM',
        'Uruguay': 'LATAM',
        'Venezuela': 'LATAM',
        'Costa Rica': 'LATAM',
        'Cuba': 'LATAM',
        'Dominican Republic': 'LATAM',
        'Guatemala': 'LATAM',
        'Honduras': 'LATAM',
        'Nicaragua': 'LATAM',
        'Panama': 'LATAM',
        // Single Euro Payments Area (SEPA)
        'Germany': 'SEPA',
        'France': 'SEPA',
        'Spain': 'SEPA',
        'Italy': 'SEPA',
        'Netherlands': 'SEPA',
        'Belgium': 'SEPA',
        'Austria': 'SEPA',
        'Portugal': 'SEPA',
        'Ireland': 'SEPA',
        'Luxembourg': 'SEPA',
        'Greece': 'SEPA',
        'Finland': 'SEPA',
        'Sweden': 'SEPA',
        'Denmark': 'SEPA',
        'Poland': 'SEPA',
        'Hungary': 'SEPA',
        'Czech Republic': 'SEPA',
        'Slovakia': 'SEPA',
        // ASEAN (Association of Southeast Asian Nations)
        'Thailand': 'ASEAN',
        'Indonesia': 'ASEAN',
        'Malaysia': 'ASEAN',
        'Vietnam': 'ASEAN',
        'Philippines': 'ASEAN',
        'Singapore': 'ASEAN',
        'Myanmar': 'ASEAN',
        'Cambodia': 'ASEAN',
        'Laos': 'ASEAN',
        'Brunei': 'ASEAN',
        // EAC (East African Community)
        'Kenya': 'EAC',
        'Tanzania': 'EAC',
        'Uganda': 'EAC',
        'Rwanda': 'EAC',
        'Burundi': 'EAC',
        'South Sudan': 'EAC',
        // GCC (Gulf Cooperation Council)
        'Saudi Arabia': 'GCC',
        'United Arab Emirates': 'GCC',
        'Qatar': 'GCC',
        'Kuwait': 'GCC',
        'Oman': 'GCC',
        'Bahrain': 'GCC',
        // CARICOM (Caribbean Community)
        'Jamaica': 'CARICOM',
        'Trinidad and Tobago': 'CARICOM',
        'Barbados': 'CARICOM',
        'Bahamas': 'CARICOM',
        'Guyana': 'CARICOM',
        'Suriname': 'CARICOM',
        'Grenada': 'CARICOM',
        'Saint Lucia': 'CARICOM',
        'Saint Vincent and the Grenadines': 'CARICOM',
        'Antigua and Barbuda': 'CARICOM',
        'Dominica': 'CARICOM',
        'Belize': 'CARICOM',
        'Saint Kitts and Nevis': 'CARICOM',
        // CEFTA (Central European Free Trade Agreement)
        'Albania': 'CEFTA',
        'Bosnia and Herzegovina': 'CEFTA',
        'North Macedonia': 'CEFTA',
        'Montenegro': 'CEFTA',
        'Serbia': 'CEFTA',
        'Kosovo': 'CEFTA',
        // Pacific Islands Forum
        'Australia': 'PIF',
        'New Zealand': 'PIF',
        'Fiji': 'PIF',
        'Papua New Guinea': 'PIF',
        'Samoa': 'PIF',
        'Solomon Islands': 'PIF',
        'Vanuatu': 'PIF',
        'Tonga': 'PIF',
        'Kiribati': 'PIF',
        'Tuvalu': 'PIF',
        'Nauru': 'PIF',
        'Marshall Islands': 'PIF',
        'Palau': 'PIF'
        // Add additional cases for other regions as needed
    };

    const regionTagsOptions = ['LATAM', 'SEPA', 'ASEAN', 'EAC', 'GCC', 'CARICOM', 'CEFTA', 'PIF']

    // Function to map countries to region tags
    const getRegionTags = (countryName) => {
        // Define mappings for region tags


        // Return the region tag for the given country name, or empty string if not found
        return regionMappings[countryName] || '';
    };

    // Function to get unique values for a specific field from countries
    const getUniqueValues = (field) => {
        const uniqueValues = new Set();
        countries.forEach(country => {
            if (country[field]) {
                if (Array.isArray(country[field])) {
                    country[field].forEach(value => uniqueValues.add(value));
                } else {
                    uniqueValues.add(country[field]);
                }
            }
        });
        return Array.from(uniqueValues);
    };

    // Function to get unique region tags from regionMappings
    const getUniqueRegionTags = () => {
        const uniqueRegionTags = new Set(Object.values(regionMappings));
        return Array.from(uniqueRegionTags);
    };
    return (
        <table className='country_table'>
            <thead>
                <tr>
                    <th style={{ minWidth: '52px' }}>Flag</th>
                    <th style={{ width: '20%' }}>Country Name</th>
                    <th style={{ width: '10%' }}>2-Letter Code</th>
                    <th style={{ width: '10%' }}>Country Code</th>
                    <th style={{ width: '15%' }}>Dial Code</th>
                    <th style={{ width: '15%' }}>Currency</th>
                    <th style={{ width: '10%' }}>Region</th>
                    <th style={{ width: '10%' }}>Region Tags</th>
                </tr>
                <tr>
                    <th></th>
                    <th>
                        <input
                            type="text"
                            name="name"
                            placeholder="Search"
                            value={filters.name}
                            onChange={handleFilterChange}
                        />
                    </th>
                    <th>
                        <input
                            type="text"
                            name="alpha2Code"
                            placeholder="Search"
                            value={filters.alpha2Code}
                            onChange={handleFilterChange}
                        />
                    </th>
                    <th>
                        <input
                            type="text"
                            name="alpha3Code"
                            placeholder="Search"
                            value={filters.alpha3Code}
                            onChange={handleFilterChange}
                        />
                    </th>
                    <th>
                        <input
                            type="text"
                            name="dialCode"
                            placeholder="Search"
                            value={filters.dialCode}
                            onChange={handleFilterChange}
                        />
                    </th>
                    <th>
                        <input
                            type="text"
                            name="currency"
                            placeholder="Search"
                            value={filters.currency}
                            onChange={handleFilterChange}
                        />
                    </th>
                    <th>
                        <select
                            name="region"
                            value={filters.region}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select</option>
                            {getUniqueValues('region').map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                    </th>
                    <th>
                        <select
                            name="regionTags"
                            value={filters.regionTags}
                            onChange={handleFilterChange}
                        >
                            <option value="">Select</option>
                            {regionTagsOptions.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </th>
                </tr>
            </thead>
            <tbody>
                {filteredCountries.map(country => (
                    <tr key={country.cca3}>
                        <td style={{ display: 'flex', justifyContent: 'center' }}><img src={country.flags && country.flags.svg} alt={`Flag of ${country.name.common}`} width="50" /></td>
                        <td>{country.name.common}</td>
                        <td>{country.cca2}</td>
                        <td>{country.cca3}</td>
                        <td>{country.idd && country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '')}</td>
                        <td>{country.currencies ? Object.keys(country.currencies).map(code => `${country.currencies[code].name} (${code})`).join(', ') : 'N/A'}</td>
                        <td>{country.region}</td>
                        <td>{getRegionTags(country.name.common)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
