import { takeEvery, put } from 'redux-saga/effects'
import {
  PRODUCT_LIST,
  SEARCH_PRODUCT,
  CREATE_FETCH_SERVICE,
  SET_CREATE_FETCH_SERVICE,
  SET_PRODUCT_LIST,
  SET_FETCH_SERVICE,
  FETCH_SERVICE,
  UPDATE_SERVICE, DELETE_SERVICE
} from './constant';
import Swal from "sweetalert2";


function* getProducts() {
  let data = yield fetch('http://localhost:8002/api/admin/fetch-products');
  data = yield data.json();
  yield put({ type: SET_PRODUCT_LIST, data })
}


function* searchProducts(data) {
  let getbody = JSON.stringify({
    "title": data.query,
  });

  let createData = yield fetch('http://localhost:8002/api/admin/search-product', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: getbody,
  });
  createData = yield createData.json();
  yield put({ type: SET_PRODUCT_LIST, data: createData })
}

function* getService() {
  let body = JSON.stringify({
    "page": 1,
    "limit": 5
  });
  let data = yield fetch('http://localhost:8002/api/admin/fetch-service-types', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body,
  });
  data = yield data.json();
  yield put({ type: SET_FETCH_SERVICE, data })
}
function* createService(request) {
  let createDataa = JSON.stringify(request.data);
  let createData = yield fetch('http://localhost:8002/api/admin/create-service-type', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: createDataa,
  });
  Swal.fire({
    text: "Record Successfully Added",
    icon: 'success',
    imageAlt: 'success image',
})
  yield* getService();


}

function* updateService(request) {
  let updateDataa = JSON.stringify(request.data);
  let updateData = yield fetch('http://localhost:8002/api/admin/update-service-type', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: updateDataa,
  });
  Swal.fire({
    text: "Record Successfully Updeted",
    icon: 'success',
    imageAlt: 'success image',
})
  yield* getService();


}

function* deleteService(request) {
  
  let deleteDataa = JSON.stringify(request.data);
  let deleteData = yield fetch('http://localhost:8002/api/admin/delete-service-type', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: deleteDataa,
  });
  yield* getService();


}

function* productSaga() {
  yield takeEvery(PRODUCT_LIST, getProducts)
  yield takeEvery(SEARCH_PRODUCT, searchProducts)
  yield takeEvery(FETCH_SERVICE, getService)
  yield takeEvery(CREATE_FETCH_SERVICE, createService)
  yield takeEvery(UPDATE_SERVICE, updateService)
  yield takeEvery(DELETE_SERVICE, deleteService)
}

export default productSaga;