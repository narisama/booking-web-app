import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import '../css/modal.css';
import $ from 'jquery';

const Modal = ({ show, onClose, children, formAct, item_id, modal_name, api }) => {
  //const host = "http://192.168.254.193:5000/";
  const host = "https://booking-server-ubbc.onrender.com/";
  const access_key = "booking-app-20080104";

  if (!show) {
    return null;
  }

  const format_date = (val) => {
    let formattedDate = "";
    let dt = '';
    try{ dt = new Date(val); formattedDate = dt.toISOString().split('T')[0]; }catch(e){ formattedDate = ""; }
    return formattedDate;
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(host+api+item_id);
      const row = await response.json();
      
      if(modal_name == "bookings"){
        const response2 = await fetch(host+"get_booking_acquired/"+item_id);
        const row2 = await response2.json();

        for(let i=0; i<row2.length; i++){
          console.log(row2[i]['product_id'], row2[i]['title'], row2[i]['prod_type']);
        }

        $('#client').val(row['client']);
        $('#contact').val(row['contact']);
        $('#email').val(row['email']);
        $('#address').val(row['address']);
        $('#sched_date').val(format_date(row['sched_date']));
        try{ $('#sched_time').val(row['sched_time']); }catch(e){}
        $('#notes').val(row['notes']);
        $('#status').val(row['status']);
      }
      else if(modal_name == "services"){
        $('#title').val(row['title']);
        $('#description').val(row['description']);
        $('#price').val(row['price']);
        $('#quantity').val(row['quantity']);
        $('#unit').val(row['unit']);
        $('#category').val(row['prod_type']);
        $('#status').val(row['status']);
      }
      else if(modal_name == "addons"){
        $('#title').val(row['title']);
        $('#description').val(row['description']);
        $('#price').val(row['price']);
        $('#category').val(row['prod_type']);
        $('#status').val(row['status']);
      }
      else if(modal_name == "billings"){
        $('#booking_id').val(row['booking_id']);
        $('#receiver').val(row['received_by']);
        $('#paid_amount').val(row['amount_paid']);
        $('#paid_date').val(format_date(row['paid_date']));
        $('#payment_mode').val(row['mode']);
        $('#ref_no').val(row['ref_no']);
        $('#billing_status').val(row['status']);
      }
    }

    if(formAct == 'update'){
      fetchData();
    }
  }, []);

  return (
    <div className="modal-backdrop">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="w-100">
          <label className="modal-title m-2">{formAct === 'add' ? 'Add' : 'Update'} Entry</label>
          <Button className="m-2 float-end" variant="danger" onClick={onClose}>X</Button>
        </div>
        <div className="m-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;