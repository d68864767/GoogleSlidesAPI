// utils.js

const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const { client_id, client_secret, redirect_uri, access_token, refresh_token } = require('./config').google;

const oauth2Client = new OAuth2(
    client_id,
    client_secret,
    redirect_uri
);

oauth2Client.setCredentials({
    access_token,
    refresh_token
});

const slides = google.slides({ version: 'v1', auth: oauth2Client });

async function getPresentation(presentationId) {
    try {
        const presentation = await slides.presentations.get({
            presentationId: presentationId
        });
        return presentation.data;
    } catch (error) {
        console.error('Error getting presentation: ' + error);
        throw error;
    }
}

async function updatePresentation(presentationId, requests) {
    try {
        const response = await slides.presentations.batchUpdate({
            presentationId: presentationId,
            requestBody: {
                requests: requests
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating presentation: ' + error);
        throw error;
    }
}

module.exports = {
    getPresentation,
    updatePresentation
};
