import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { accountService } from '@/_services';

function DeliveryProducts({ history, match }) {

  const [data, setData] = useState([]);

  const dataColumns = [
    {
      label: 'Customer Type',
      field: 'customerType',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Delivery Status',
      field: 'deliveryStatus',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Priority',
      field: 'priority',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Expected Delivery Time',
      field: 'expectedTime',
      sort: 'asc',
      width: 200
    },
  ];

  useEffect(() => {

    accountService.getAll().then((response) => {
      const rows = [];
      response.forEach(deliveryDetail => {
        const details = deliveryDetail["deliveryDetails"];
        rows.push({
          customerType: details["customerType"],
          priority: deliveryDetail["deliveryPriority"],
          deliveryStatus: details["deliveryStatus"],
          expectedTime: details["expectedDeliveryTime"]
        });
      });
     
      const queriedData = {
        columns: dataColumns,
        rows: rows
      }
      setData(queriedData);
    });
  }, []);


  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 offset-sm-2 mt-5">
          <div className="card m-3">
            <MDBDataTable
              striped
              bordered
              small
              data={data}
              sortable
            />
          </div>
        </div>
      </div>
    </div>

  );
}


export { DeliveryProducts };