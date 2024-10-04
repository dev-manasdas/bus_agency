1. # Bus Agency
2. # Description
    Implemented a backend project for bus agency, agency from where a customer can book a vehicle
    for long trips. This agency has different types of vehicles like mini bus, super deluxe, mini super
    deluxe and double decker bus. Create database, tables and add some dummy manually.
    Customers can make booking in advance by selecting vehicle, pickup and drop location
    address, distance (in km) and number of seats. At the time of booking creation, customers can
    see vehicles with number of seats in it and cost per km. Once booking is created for a vehicle,
    it’s available status will get changed. Once the booking gets completed, then that vehicle will be
    available once again.
3. # Installation
    installed dependencies : 
      dotenv,express,gitignore,mongodb,mongoose,nodemon,log4js
  # environment variables
       MONGODB_URI=mongodb://localhost:27017/bus-agency
       PORT=3000
4. # APIs
    create user-> POST: http://127.0.0.1:3000/users/
    request body->
    {
    "name": "Manas Das",
    "email": "manasdas@gmail.com",
    "phone": "1234567890"
    }
    get all users-> GET : http://127.0.0.1:3000/users/
    update users-> PUT :  http://127.0.0.1:3000/users/userId
    request body->
    {
    "name": "Manas Das",
    "email": "manas@gmail.com",
    "phone": "1234567890"
    }
    soft delete an user-> DELETE : http://127.0.0.1:3000/users/userId
    create vehicle-> POST : http://127.0.0.1:3000/vehicles/
    request body->
     {
        "name": "Double Decker Bus",
        "number_plate": "DD-004",
        "rate_per_km": 20
    }
    get all vehicle details with query string-> GET : http://127.0.0.1:3000/vehicles?available=true
    create booking-> POST: http://127.0.0.1:3000/bookings/
    request body->
    {
    "user_id": "66ff8031ec04bca537cdffc8",
    "vehicle_id": "66ff873c2f1a3601dfcf0ca3",
    "pickup_location": "SDF More",
    "drop_location": "Santragachi Station Road",
    "distance": 30, 
    "seats": 10
   }
    mark booking as completed-> POST: http://127.0.0.1:3000/bookings/mark-completed
    request body->
    {
    "bookingId":"66ff93770162b392da6ed45d"   
    }

