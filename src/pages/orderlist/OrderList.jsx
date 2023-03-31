import './orderlist.css'

import React, { useEffect } from 'react'
import { DeleteOutline } from "@material-ui/icons";
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import { getUser, orderDelete } from '../../redux/apiCalls';
import Avatar from '../../components/Avatar/Avatar';

const OrderList = () => {

  let orders = useSelector(state=>state.orders.orders);
  const users = useSelector(state=>state.manageUsers.users)
  const dispatch = useDispatch();
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <Avatar url={params.row.user?.avatar} name={params.row.user?.fullname} />
            {params.row.user?.fullname}
          </div>
        );
      },
    },
    { field: "amount", headerName: "Amount", width: 130 },
    {
      field: "creationDate",
      headerName: "Date",
      width: 150,
    },
    {
      field: "updateDate",
      headerName: "Last Update Date",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const handleDelete = (id) =>{
    const confirm = window.confirm('Do you want to delete this order')
    if(confirm){
      dispatch(orderDelete(id)); 
    }
  }


  return (
    <div className="userList">
      <DataGrid
        rows={orders}
        getRowId={(row)=>row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
  </div>
  )
}

export default OrderList