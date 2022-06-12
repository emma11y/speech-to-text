# Speech-To-Text

## Before you start

You need to set API keys in app-config.json file

### Deepgram

- Create or use your account [Deepgram](https://deepgram.com/)
- Create the API key on the Deepgram console

### Google

- Create or use your account on [Google Cloud Platform](https://console.cloud.google.com/)
- Enable [Cloud Speech API](https://console.cloud.google.com/flows/enableapi?apiid=speech.googleapis.com) service
- Create the [service account](https://cloud.google.com/docs/authentication/getting-started) and set the environment key with GOOGLE_APPLICATION_CREDENTIALS

### Microsoft

- Create or use your account on the Azure portal
- Create the service [Azure Cognitive Services](https://azure.microsoft.com/fr-fr/services/cognitive-services/)
- Create the Speech resource
- Find the API key and location found in the settings of your "Keys and Endpoint" resource

### Mozilla

You don't need an API key to use Mozilla's Web Speech API.

## Development server

Run `ng serve` or `npm run start` for a dev server. Navigate to `http://localhost:4201/`. The app will automatically reload if you change any of the source files.

