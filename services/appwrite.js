import { Platform } from "react-native";
import { Account, Client, Databases } from "react-native-appwrite";

const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT, // Your Appwrite Endpoint
    project: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID, // Your Appwrite Project ID
    database: process.env.EXPO_PUBLIC_APPWRITE_DB_ID, // Your Appwrite Database ID
    col: {
        notes: process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID, // Your Appwrite Collection ID for Notes
    }
}

const client = new Client()
    .setEndpoint(config.endpoint)
    .setProject(config.project);

switch (Platform.OS) {
    case 'ios':
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID);
        break;
    case 'android':
        client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME);
        break;
}

const database = new Databases(client);

const account = new Account(client);

export { account, client, config, database };

