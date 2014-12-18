#!/bin/bash

# Get the Bluemix Org and the App name
ORG=${CF_ORG}
APP=${CF_APP}

# Get the Bluemix App name
# echo ${CF_APP}

# Replace non-alpha , non-numeric characters in Org name and App name
ORG_ID=${ORG//[^a-zA-Z0-9_-]/-}
APP_ID=${APP//[^a-zA-Z0-9_-]/-}

# Create a custom host based on App name and Org name
Host_ID=$APP_ID"-"$ORG_ID
echo "Prepared to push using" $Host_ID

# Push using cf push <App-name> -n <custom_host_ID>
# cf push ${CF_APP} -n $Host_ID

cf push $APP_ID -n $Host_ID -m 128M

# View logs
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]
then
    cf logs ${CF_APP} --recent
    exit $EXIT_CODE
fi