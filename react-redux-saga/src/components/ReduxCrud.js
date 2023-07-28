import React, { useState } from 'react';
import Table from 'react-bootstrap/Table'
import { Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector, useDispatch } from 'react-redux'
import { serviceList, createService, updateService, deleteService } from '../redux/crudAction';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
function ReduxCrud() {
  const dispatch = useDispatch();
  let data = useSelector((state) => state.crudData[0]);
  const [isShow, invokeModal] = React.useState(false)
  const [editIsShow, setEditIsShow] = React.useState(false)
  const [editService, setEditService] = React.useState([])
  const [name, setName] = useState('');
  const initModal = () => {
    return invokeModal(!isShow)
  }
  const editInitModal = () => {
    return setEditIsShow(!editIsShow)
  }
  const editInitModalData = (data) => {
    setEditService(data)
    editInitModal()
  }
  const deleteInitModalData = (id) => {
    let body = { "service_type_id": id }
    dispatch(deleteService(body))
  }
  useEffect(() => {
    dispatch(serviceList())
  }, [])
  const validateInput = (e) => {
    e.preventDefault();
    // setName(e.target.fname.value);
    // let body = { "name_en": e.target.fname.value }
    let body = {
      "title": e.target.title.value,
      "description": e.target.description.value,
      "price": e.target.price.value,
      "discount_percentage": e.target.discount_percentage.value,
      "rating": e.target.rating.value,
      "stock": e.target.stock.value,
      "brand": e.target.brand.value,
      "category": e.target.category.value
    }
    dispatch(createService(body))
    initModal()

  }
  const validateEditInput = (e) => {
    e.preventDefault();
    // setName(e.target.fname.value);
    let body = {
      "title": e.target.title.value,
      "description": e.target.description.value,
      "price": e.target.price.value,
      "discount_percentage": e.target.discount_percentage.value,
      "rating": e.target.rating.value,
      "stock": e.target.stock.value,
      "brand": e.target.brand.value,
      "category": e.target.category.value,
      "service_type_id": editService.id
    }


    // let body = { "name_en": e.target.fname.value,"service_type_id":editService.id }
    dispatch(updateService(body))
    editInitModal()
  }
  return (
    <>

      <h3>Dark Variant Small Size Table
        <Button variant="success" onClick={initModal}>
          Add
        </Button>{` `}
        <Link to={`/`} > <Button variant="success" >
          List
        </Button></Link></h3>

      <Table bordered hover variant="dark" size="sm">
        <thead>
          <tr>
            <th width="170"> Name</th>
            <th width="1950">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) =>
            <tr key={item.id}>
              {/* <td>{item.name_en}</td> */}
              <td>{item.title}</td>


              <td><Button variant="primary" onClick={() => { editInitModalData(item) }}> Edit
              </Button>{" "}<Button variant="danger" onClick={() => { deleteInitModalData(item.id) }}> Delete
                </Button></td>

            </tr>)}



        </tbody>
      </Table>
      <Modal show={isShow}>
        <form onSubmit={validateInput}>
          <Modal.Header closeButton onClick={initModal}>
            <Modal.Title>React Modal Popover Example</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            {/* <label>Name
              <input type="text" name='fname' ></input>
            </label> */}
            <label>title
              <input type="text" name='title' ></input>
            </label>
            <label>description
              <input type="text" name='description' ></input>
            </label>
            <label>price
              <input type="text" name='price'></input>
            </label>
            <label>discount_percentage
              <input type="text" name='discount_percentage'></input>
            </label>
            <label>rating
              <input type="text" name='rating'></input>
            </label>
            <label>stock
              <input type="text" name='stock'></input>
            </label>
            <label>brand
              <input type="text" name='brand'></input>
            </label>
            <label>category
              <input type="text" name='category'></input>
            </label>



            {/* </form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
              Close
            </Button>
            <Button type="submit" variant="dark" >
              Store
            </Button>

          </Modal.Footer>
        </form>
      </Modal>
      <Modal show={editIsShow}>
        <form onSubmit={validateEditInput}>
          <Modal.Header closeButton onClick={editInitModal}>
            <Modal.Title>React Modal Popover Example</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <label>title
              <input type="text" name='title' defaultValue={editService.title}></input>
            </label>
            <label>description
              <input type="text" name='description' defaultValue={editService.description}></input>
            </label>
            <label>price
              <input type="text" name='price' defaultValue={editService.price}></input>
            </label>
            <label>discount_percentage
              <input type="text" name='discount_percentage' defaultValue={editService.discount_percentage}></input>
            </label>
            <label>rating
              <input type="text" name='rating' defaultValue={editService.rating}></input>
            </label>
            <label>stock
              <input type="text" name='stock' defaultValue={editService.stock}></input>
            </label>
            <label>brand
              <input type="text" name='brand' defaultValue={editService.brand}></input>
            </label>
            <label>category
              <input type="text" name='category' defaultValue={editService.category}></input>
            </label>


            {/* </form> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={editInitModal}>
              Close
            </Button>
            <Button type="submit" variant="dark" >
              Store
            </Button>

          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}
export default ReduxCrud