# 🌍 TravelMate

**TravelMate** is a travel companion web application that helps users plan and explore destinations with the help of interactive maps, geocoding capabilities, media uploads, and more. Built using modern web technologies, TravelMate delivers an intuitive and responsive interface for travelers to share and document their journeys.

---

## 🚀 Features

* 📍 **Geocoding with Mapbox**

  * Users can search for and display locations on an interactive map using the Mapbox API.
  * Real-time map rendering and place suggestions for enhanced UX.

* 📄 **File Upload**

  * Upload and attach images/documents for specific destinations or notes.
  * Supports multiple file formats and integrates with form submissions.

* 📝 **Trip Entries**

  * Create, read, update, and delete trip logs or destination notes.
  * Includes title, description, location coordinates, and media.

* 🗓️ **Itinerary Management**

  * Organize destinations by date and time.
  * Helps users track their travel plans effectively.

* 🌐 **Responsive Design**

  * Mobile-first design using Bootstrap for seamless experience on all devices.

---

## 📚 Technologies Used

* **Frontend**: HTML, CSS, JavaScript, Bootstrap
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Geolocation API**: Mapbox
* **File Storage**: Multer (for file upload handling)

---

## 📆 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/vaibhav-0310/travelmate.git
   cd travelmate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:

   ```env
   MAPBOX_TOKEN=your_mapbox_token
   MONGODB_URI=your_mongo_connection_string
   PORT=3000
   ```

4. **Start the server**

   ```bash
   npm start
   ```

5. **Visit the application**
   Navigate to `http://localhost:3000` in your browser.

---

```

---

## 💪 Contribution

Pull requests are welcome! Feel free to fork the repository and submit changes.

---


## 🌟 Acknowledgements

* [Mapbox](https://www.mapbox.com/) for map and geocoding services
* [Multer](https://github.com/expressjs/multer) for file handling
* [Bootstrap](https://getbootstrap.com/) for responsive design
