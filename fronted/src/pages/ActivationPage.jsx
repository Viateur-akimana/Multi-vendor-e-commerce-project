import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import axios from "axios";
import server from "../server"

const ActivationPage = () => {
  const { activationToken } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activationToken) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activationToken,
          });
          console.log(res.data.message);
        } catch (error) {
          console.log(error.res.data.message);
        }
      };

      activationEmail();
    }
  }, [activationToken]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      error? (<p>your token have been expired</p>):(
      <p>your account have been created successfully</p>)
    </div>
  );
};

export default ActivationPage;
