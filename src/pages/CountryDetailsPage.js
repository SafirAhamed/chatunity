import React from 'react';
import { CountryDetailsTable } from '../modules/countryDetails/CountryDetailsTable';
import { pageTitleStyle } from '../utils/commonStyles';
import './CountryDetailsPage.scss'; // Import your custom styles for scrollbar here

const CountryDetailsPage = () => {
    return (
        <div>
            <div style={pageTitleStyle}>Country Details</div>
            <div className="country-table-layout-main">
                <div className="country-table-layout-table-main">
                <div className="scrollable-content">
                    <CountryDetailsTable />
                </div>

                </div>
            </div>
        </div>
    );
};

export default CountryDetailsPage;
