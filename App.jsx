import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const authResponse = await axios.post(
        "http://4.224.186.213/evaluation-service/auth",
        {
          email: "a2023cse9626@imsec.ac.in",
          name: "Ramansh Agarwal",
          rollNo: "2301430100185",
          accessCode: "nyXQMu",
          clientID: "58b4dc8e-5b08-439b-86b7-78ee4d23b24f",
          clientSecret: "AavGYYvHPYcPUfsj",
        }
      );

      const token = authResponse.data.access_token;

      const notificationResponse = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        notificationResponse.data.notifications ||
        notificationResponse.data.data ||
        notificationResponse.data ||
        [];

      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to fetch notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notification Dashboard</h1>

      {notifications.length === 0 ? (
        <p>No Notifications Found</p>
      ) : (
        notifications.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              margin: "10px 0",
              borderRadius: "8px",
            }}
          >
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        ))
      )}
    </div>
  );
}