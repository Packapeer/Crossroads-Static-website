

function paymentprocess(){


    var options = {
        "key": "rzp_test_EjwEX0eJ90FIOx", // Enter the Key ID generated from the Dashboard
        "amount": 5000*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "CROSSROADS",
        "description": "Exclusive Membership For One Year",
        "image": "images/main-logo-crossroads.jpg",
        //"order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){

            $('#form-modal').modal('toggle');
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
        },
        "prefill": {
            "name": "",
            "email": "",
            "contact": ""
        },
        "notes": {
            "address": ""
        },
        "theme": {
            "color": "#528FF0"
        }
    };
    var propay = new Razorpay(options);
    propay.open();
}