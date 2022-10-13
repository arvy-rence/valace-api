import axios from "axios";

export const wake = () => {
    console.log("Waking up...")
    setInterval(async () => {
        try {
            await axios.get("https://valace-api.herokuapp.com/api/")
            console.log("Woke up!")
        } catch (e) {
            console.log("Error waking up: " + e)
        }
    }, 20 * 60 * 1000)
}