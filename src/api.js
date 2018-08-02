import axios from "axios";
import { TWITTER_API_KEY } from "./config/config.js";

const twitterService = axios.create({
    baseUrl: "TODO insert twitter api url"
});

export default {
    twitterService: twitterService,

    delay(t, v) {
        return new Promise(function(resolve) {
            setTimeout(resolve.bind(null, v), t);
        });
    }
};
