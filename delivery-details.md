Status-based tracking: - 

1. Model it as an event log, not a single status field
Create a separate order_status_events table/collection in a database:

order_id | status | timestamp | updated_by | note

Statuses: RECEIVED, PACKED, OUT_FOR_DELIVERY, DELIVERED (maybe CANCELLED/FAILED_DELIVERY too).

2. Use firebase push message for sending notificaiton/ or whatever the app developers are using right now

3. Who updates the status, and how?
there's no courier API pushing updates automatically, a human has to trigger each state change. Options, roughly in order of effort:

- Staff-only, from your admin panel — Staff marks "packed" and "out for delivery" when they hand off to the rider, and marks "delivered" after a confirmation call/WhatsApp from the rider.
- Rider gets a dumb link, no app — generate a unique per-order (or per-day-batch) link like printcampus.app/rider/update?token=xyz, opens a barebones mobile web page with big buttons: "Picked Up", "Out for Delivery", "Delivered" (maybe with a photo/OTP confirmation for delivered). No login needed, token-based. This is usually the sweet spot — rider doesn't need to install anything, you get real-time-ish updates without building a whole rider app.