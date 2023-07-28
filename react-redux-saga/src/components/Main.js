import { addToCart, emptyCart, removeToCart } from '../redux/action';
import { useDispatch } from 'react-redux'
import { productList } from '../redux/productAction';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { ExportToCsv } from 'export-to-csv';


function Main() {
  const dispatch = useDispatch();
  let data = useSelector((state) => state.productData);
  let data1 = useSelector((state) => state);


  function handleExport() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'product',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data);

  }
  useEffect(() => {
    dispatch(productList())

  }, [])
  return (
    <div>
      <div>
        <Button variant="success" onClick={() => dispatch(emptyCart())}>
          Empty Cart
        </Button>{" "}
        <Button variant="dark" onClick={handleExport}>
        Export CSV
        </Button>{" "}
        <Link to={`/redux-crud`} ><Button variant="success">
          Redux crud
        </Button></Link>


      </div>
      <div className='product-container'>
        {
          data?.map((item) => <div key={item.id} className='product-item'>
            <div>Name : {item.title} </div>
            <div>Stock : {item.stock} </div>
            <div>Price : {item.price} </div>
            <div>Category : {item.category} </div>
            <div>Brand : {item.brand} </div>
            <div>
              <Button variant="success" onClick={() => dispatch(addToCart(item))}>
                Add to Cart
              </Button>{" "}
              <Button variant="danger" onClick={() => dispatch(removeToCart(item.id))}>
                Remove to Cart
              </Button>


            </div>
          </div>)
        }
      </div>
    </div>
  );
}

export default Main;
