import { useState, useEffect } from "react";

export const UseAvatarUpdate = (name) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const updateAvatar = async () => {
      setIsLoading(true);
      try {
        const avatarUrl = "https://images.pexels.com/photos/1694360/pexels-photo-1694360.jpeg?auto=compress&cs=tinysrgb&w=1600";
        const response = await fetch(
          `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/media`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatar: avatarUrl }),
          }
        );

        if (response.ok) {
          console.log("Avatar updated successfully");
        } else {
          console.error("Error updating Avatar");
          setIsError(true);
        }
      } catch (error) {
        console.error("Error updating Avatar", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    updateAvatar();
  }, [name]);

  return { isLoading, isError };
};

export default UseAvatarUpdate;