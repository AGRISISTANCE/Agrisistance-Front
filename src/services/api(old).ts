const BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8081/api";

export const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  body?: object
) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const options: RequestInit = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }), // Only add body if it's provided
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    // Parse the response JSON
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "An error occurred");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};
