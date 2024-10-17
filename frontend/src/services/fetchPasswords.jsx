import {API_URL} from "./constants";
import axios from "axios";


async function fetchPasswords(userId, token) {
    try {
        return await axios.get(API_URL + `/users/${userId}/passwords`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Attach JWT in Authorization header
            }
        })
    } catch (e) {
        throw e
    }
}

export default fetchPasswords
