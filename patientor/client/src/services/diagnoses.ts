import axios from "axios";
import { Diagnosis, NewEntry, Patient } from "../types";

import { apiBaseUrl } from "../constants";


const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );
  return data;
};
const addEntry = async (id: string, object: NewEntry) => {
  try{
    const response = await axios.post<Patient>(
      `${apiBaseUrl}/diagnoses/${id}/entries`,
      object
    );
    return response.data;
  } catch (error : unknown) {
    return error;
  }
};
export default {
  getAll, addEntry
};

