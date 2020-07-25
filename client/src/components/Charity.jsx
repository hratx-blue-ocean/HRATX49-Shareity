import React, { useState } from 'react';
// import './Charity.css';

const Charity = () => {

    return (

        <>
            <h1>This is the start of the Charity page</h1>
            {/* This is where the left side of the Charity page starts */}
            <div className="charityContainerLeft">
                <div className="charityLogoContainer">
                    <img className="charityLogo"></img>
                </div>
                <div className="charityListItemsContainer">
                    {/* <ItemList /> */}
                    {/* <div>
                        <image></image>
                        <h3>there is some text that goes here</h3>
                    </div> */}
                </div>
                <div className="charityDonationsReceived">
                    <h2 className="charityDonationsReceivedTitle">Donations Received</h2>
                    <span className="charityDonationsReceivedNumber">34</span>
                </div>
            </div>


            {/* This is where the right side of the Charity page starts */}
            <div className="charityContainerRight">
                {/* This is the section for the item that still need to be picked up that have been selected buy the charity */}
                <div className="charityItemsForPickup">
                    {/* This is the header and sort selector */}
                    <div className="charityItemsForPickupHeader">
                        <select className="charityItemsForPickupDropdown">
                            <option>Date</option>
                            <option>Distance</option>
                            <option>Name</option>
                        </select>
                        <h3 className="charityAvailableForPickup">Available for pickup</h3>
                    </div>
                    {/* actual items to be picked up */}
                    <div className="charityWaitingForPickup">
                        {/* <PickupList /> */}
                    </div>
                </div>
                <div className="charityMessageContainer">
                    {/* <MessageBox /> */}
                </div>
            </div>


        </>
    )
}

export default Charity;
