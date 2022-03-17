import { useCallback, useEffect, useState } from 'react';
import { getTicketDetails } from './TicketsDetail';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/rootReducer';
import { Pagination, Space, Table } from 'antd';
import './styles.less'
import moment from 'moment';

const DeliveryProducts = () => {

  const { tickets, total, pageNumber } = useAppSelector(state => state.ticketDetailReducer);
  const [page, setPage] = useState(pageNumber);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Customer Type',
      dataIndex: 'customerType',
      key: 'customerType',
      width: 150,
      render: (text, record) => (
        <Space style={{ color: 'black' }}>{record.deliveryDetails.customerType}</Space>
      ),
    },
    {
      title: 'Delivery Status',
      dataIndex: 'deliveryStatus',
      key: 'deliveryStatus',
      width: 150,
      render: (text, record) => (
        <Space style={{ color: 'black' }}>{record.deliveryDetails.deliveryStatus}</Space>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 150,
      render: (text, record) => (
        <Space style={{ color: 'black' }}>{record.deliveryPriority}</Space>
      ),
    },
    {
      title: 'Expected Delivery Time',
      dataIndex: 'expectedDeliveryTime',
      key: 'expectedDeliveryTime',
      width: 150,
      render: (text, record) => (
        <Space style={{ color: 'black' }}>{`${moment().diff(moment(record.deliveryDetails.expectedDeliveryTime), 'm') * -1}mins
         ${moment(record.deliveryDetails.expectedDeliveryTime).format("(HH:mm)")}`}</Space>
      )
    },
  ];

  const onPageChange = (value: number) => {
    setPage(value);
  };

  const fetchTicketDetails = useCallback(() => dispatch(getTicketDetails({
    page: page,
    pageSize: 50
  })), [dispatch, page]);

  useEffect(() => {
    fetchTicketDetails()
  }, [fetchTicketDetails]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-8 offset-sm-2 mt-5">
          <div className="card m-3">
            <Table
              className='table-striped-rows'
              columns={columns}
              pagination={false}
              dataSource={tickets}
              rowKey={(record) => `${record.id}}`}
            />
            {total ? (
              <div className='pagination'>
                <Pagination
                  showLessItems
                  size='small'
                  total={total}
                  showSizeChanger={false}
                  current={page}
                  onChange={onPageChange}
                  className='mb-25'
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>

  );
}


export { DeliveryProducts };
