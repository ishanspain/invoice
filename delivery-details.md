So As now we are hiring the local delivery boys, only thing we need in the real time delivery event notification: -=
For this i find the the app push notification to be the best option for now that will send the delivery Statuses: RECEIVED, PACKED, OUT_FOR_DELIVERY, DELIVERED (maybe CANCELLED/FAILED_DELIVERY too).
Use firebase push message for sending notificaiton/ or whatever the app developers are using right now

So the app developer would need to create one more page admin page in the app itself which will show only the specific, order details to the rider that they have
been assigned
Or the same can be done via web, if we wish to a sperate delivery web page with url like this: -

1. Staff-only, from your admin panel — Staff marks "packed" and "out for delivery" when they hand off to the rider
2. Incase of the rider carring multiple orders, then in this case to make it easier for the update the delivery status for every packages, we would requrie to add the
qr code on every package , what will redirect the webpage with url like this printcampus.in/rider/update?signedtoken=abc?orderid=xyz 

Note the delivery status page updatation should only be visible, only if the delivery partner is authentication(has valid session for security)

For this connection of this app push notification with delivery webiste would be needed.