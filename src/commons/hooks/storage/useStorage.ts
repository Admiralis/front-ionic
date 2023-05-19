import {Storage} from "@ionic/storage";
import React from "react";

function useStorage() {

    const storage = new Storage();
    (async () => {
        await storage.create();
    })();

    return {storage}
}

export default useStorage;