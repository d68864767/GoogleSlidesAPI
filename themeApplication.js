// themeApplication.js

const { google } = require('googleapis');
const slides = google.slides('v1');
const { authenticate } = require('./utils');

async function applyTheme(google, presentationId, themeId) {
    const auth = authenticate(google);
    const request = {
        presentationId: presentationId,
        resource: {
            requests: [
                {
                    updatePresentationTheme: {
                        themeId: themeId
                    }
                }
            ]
        },
        auth: auth
    };

    try {
        const response = await slides.presentations.batchUpdate(request);
        console.log(`Theme applied: ${response.data.replies[0].updatePresentationTheme.theme.displayName}`);
    } catch (error) {
        console.error(`Error applying theme: ${error}`);
        throw error;
    }
}

module.exports = {
    applyTheme
};
