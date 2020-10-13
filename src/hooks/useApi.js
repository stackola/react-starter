import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const apiUrl = "https://ola-be.coilinter.de:5000/blvdb/";

export function useApi(
  { path, authenticate, method, repeat = false, responseType },
  cb = () => {}
) {
  let [status, setStatus] = useState("start"); //start, loading, error, done
  let [error, setError] = useState(null); //start, loading, error, done
  let [result, setResult] = useState({});
  let token = useSelector((s) => s.user && s.user.token);

  let history = useHistory();
  let exec = (data) => {
    if (["loading"].includes(status)) {
      return;
    }
    if (status == "done" && !repeat) {
      return;
    }
    setStatus("loading");
    setResult({});
    setError(null);

    //fetch from path
    let options = {
      method: method ? method : data ? "POST" : "GET",
      url: apiUrl + path,
      data,
    };
    if (authenticate) {
      options.headers = {
        Authorization: "Bearer " + token,
      };
    }
    if (responseType) {
      options.responseType = responseType;
    }
    axios(options)
      .then((r) => {
        setResult(r.data);
        setError(null);
        setStatus("done");
        cb(r.data);
      })
      .catch((r) => {
        if (r && r.message && r.message.includes("401")) {
          history.push("/login");
        }
        setError(
          (r && r.response && r.response.data && r.response.data.message) ||
            "Unerwarteter Fehler. Bitte überprüfen Sie Ihre Eingaben."
        );
        setStatus("error");
      });
  };

  return [exec, status, result, error];
}
