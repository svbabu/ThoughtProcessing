import React from 'react';

type Props = {
    data: any; // You can replace `any` with a proper type later
};

export const DefaultAddressCard: React.FC<Props> = ({ data }) => {
    return (
        <div className="default-address-card">
            <p>{data?.fullName}</p>
            <p>{data?.buildingName}, {data?.streetName}, {data?.city},
                {data?.pincode},{data?.state},{data?.landmark}</p>
            <p>Mobile Number:{data?.mobileNumber}</p>
             <p> {data?.useDefault && (
                <span className="default-badge" style={{ marginLeft: "10px" }}>Default</span>
              )}


            </p>

            {/* Add more fields as needed */}
        </div>
    );
};

export default DefaultAddressCard;

