import { useState } from 'react';
import { useParams } from "react-router-dom";

export function AdminUpdate() {
 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState("");
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [rating, setRating] = useState(0);
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent ] = useState("");
  const [data, setData] = useState({});

 

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();

  
    const updateVenueAction = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const payload = {
        name: name,
        description: description,
        media: media,
        price: parseFloat(price),      
        maxGuests: parseInt(maxGuests), 
        rating: parseFloat(rating),
        meta: {
          wifi: wifi,
          parking: parking,
          breakfast: breakfast,
          pets: pets,
        },
        location: {
          address: address,
          city: city,
          zip: zip,
          country: country,
          continent: continent,
        },
      };
    

      const apiUrl = `https://api.noroff.dev/api/v1/holidaze/venues/${id}`;


      try {
        const response = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(payload),
        });
        
        if (response.ok) {
          const data = await response.json();
          setIsSubmitting(false);
          setData(data);
         
        alert("You have successfully updated the venue")
         
          
        } else {
          setIsSubmitting(false);
          
          const errorData = await response.json();
          if (errorData.errors !== undefined) {
            setValidationErrors(errorData.errors);
          }
        }
      } catch (error) {
        setIsSubmitting(false);
        console.error("An error occurred:", error);
      }
    };
    return null;

  }

  export default AdminUpdate;
  
