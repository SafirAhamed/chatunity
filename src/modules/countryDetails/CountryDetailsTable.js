import React, { useEffect, useState } from 'react';
import './CountryDetailsTable.scss';
import PrimaryInput from '../../components/common/inputFields/PrimaryInput';
import CommonAutocomplete from '../../components/common/inputFields/CommonAutocomplete';
import { regionMappings, regionTagsOptions } from './constantsAndConfigs';

export const CountryDetailsTable = () => {
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
    const [options, setOptions] = useState({
        region: [],
        regionTags: []
    });
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

    const handleFilterDropdownChange = (value, name) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value || ""
        }));
    };

    // Function to handle sorting
    const handleSort = (key) => {
        if (key === 'flags.svg') {
            return; // Disable sorting for 'Flag' column
        }

        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Function to get sorted and filtered countries
    const getSortedFilteredCountries = () => {
        let sortedFilteredCountries = [...filteredCountries];

        if (sortConfig.key) {
            sortedFilteredCountries.sort((a, b) => {
                const varA = getValueForSorting(a, sortConfig.key);
                const varB = getValueForSorting(b, sortConfig.key);

                if (varA < varB) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (varA > varB) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return sortedFilteredCountries;
    };

    // Helper function to get the value for sorting from country object
    const getValueForSorting = (country, key) => {
        switch (key) {
            case 'name.common':
                return country.name.common.toLowerCase();
            case 'cca2':
                return country.cca2.toLowerCase();
            case 'cca3':
                return country.cca3.toLowerCase();
            case 'idd.root':
                return country.idd && country.idd.root ? country.idd.root.toLowerCase() : '';
            case 'currencies':
                return country.currencies ? Object.keys(country.currencies).map(code => country.currencies[code].name.toLowerCase()).join(', ') : '';
            case 'region':
                return country.region.toLowerCase();
            case 'regionTags':
                return getRegionTags(country.name.common).toLowerCase();
            default:
                return '';
        }
    };

    // Function to filter countries based on current filters
    useEffect(() => {
        const filtered = countries?.filter(country =>
            country.name.common?.toLowerCase().includes(filters.name?.toLowerCase()) &&
            country.cca2?.toLowerCase().includes(filters.alpha2Code?.toLowerCase()) &&
            country.cca3?.toLowerCase().includes(filters.alpha3Code?.toLowerCase()) &&
            (country.idd && country.idd.root?.toLowerCase().includes(filters.dialCode?.toLowerCase())) &&
            (country.currencies ? Object.keys(country.currencies).some(code =>
                country.currencies[code].name.toLowerCase().includes(filters.currency?.toLowerCase())
            ) : true) &&
            country.region?.toLowerCase().includes(filters.region?.toLowerCase()) &&
            getRegionTags(country.name.common)?.toLowerCase().includes(filters.regionTags?.toLowerCase())
        );
        setFilteredCountries(filtered);
    }, [countries, filters]);

    // Function to map countries to region tags
    const getRegionTags = (countryName) => {
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

    useEffect(() => {
        if (countries.length > 0)
            setOptions({
                region: getUniqueValues('region'),
                regionTags: regionTagsOptions
            });
    }, [countries]);

    const tableHeaders = [
        { label: 'Sl.no', key: 'flags.svg', width: '20px', sortable: false },
        { label: 'Flag', key: 'flags.svg', width: '52px', sortable: false },
        { label: 'Country Name', key: 'name.common', width: '20%', sortable: true },
        { label: '2-Letter Code', key: 'cca2', width: '10%', sortable: true },
        { label: 'Country Code', key: 'cca3', width: '10%', sortable: true },
        { label: 'Dial Code', key: 'idd.root', width: '10%', sortable: true },
        { label: 'Currency', key: 'currencies', width: '20%', sortable: true },
        { label: 'Region', key: 'region', width: '10%', sortable: true },
        { label: 'Region Tags', key: 'regionTags', width: '10%', sortable: true }
    ];

    return (
        <table className='country_table'>
            <thead>
                <tr>
                    {tableHeaders.map(header => (
                        <th key={header.label} style={{ width: header.width }} onClick={() => handleSort(header.key)}>
                            {header.label} {header.sortable && sortConfig.key === header.key && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                    ))}
                </tr>
                <tr>
                    <th colSpan={2}>{`Showing ${getSortedFilteredCountries()?.length} / ${countries?.length} countries`}</th>
                    <th >
                        <PrimaryInput
                            name="name"
                            label="Search"
                            placeholder={'Search country'}
                            value={filters.name}
                            onChange={handleFilterChange}
                        />
                    </th>
                    <th>
                        <PrimaryInput
                            name="alpha2Code"
                            label="Search"
                            value={filters.alpha2Code}
                            onChange={handleFilterChange}
                        />
                    </th>
                    <th>
                        <PrimaryInput
                            name="alpha3Code"
                            label="Search"
                            value={filters.alpha3Code}
                            onChange={handleFilterChange}
                        />
                    </th>
                    <th>
                        <PrimaryInput
                            name="dialCode"
                            label="Search"
                            value={filters.dialCode}
                            onChange={handleFilterChange}
                        />
                    </th>
                    <th>
                        <PrimaryInput
                            name="currency"
                            label="Search"
                            value={filters.currency}
                            onChange={handleFilterChange}
                        />
                    </th>
                    <th>
                        <CommonAutocomplete
                            label="Search"
                            name="region"
                            options={options?.region}
                            value={filters.region}
                            onChange={(e, val) => handleFilterDropdownChange(val, 'region')}
                        />
                    </th>
                    <th>
                        <CommonAutocomplete
                            label="Search"
                            name="regionTags"
                            options={options?.regionTags}
                            value={filters.regionTags}
                            onChange={(e, val) => handleFilterDropdownChange(val, 'regionTags')}
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                {getSortedFilteredCountries().map((country, index) => (
                    <tr key={country.cca3}>
                        <td style={{textAlign:'center'}}>{index + 1}</td> {/* Adding index + 1 for 1-based numbering */}
                        <td style={{ display: 'flex', justifyContent: 'center' }}>
                            {country.flags && country.flags.svg && <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="50" />}
                        </td>
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
    );
};
