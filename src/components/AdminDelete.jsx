import { useParams } from "react-router-dom";

export const AdminDelete = async () => {
  const { id } = useParams(); // Assuming you have a parameter named 'id' in your route
  const apiUrl = `https://api.noroff.dev/api/v1/holidaze/venues/${id}`;

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (response.ok) {
      console.log("Venue deleted successfully");
      // You might want to redirect or perform other actions after successful deletion
    } else {
      console.error("Error deleting venue");
      // Handle error cases
    }
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle unexpected errors
  }

  return null;
};

export default AdminDelete;
