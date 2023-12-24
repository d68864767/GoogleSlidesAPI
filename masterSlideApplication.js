// masterSlideApplication.js

const { google } = require('googleapis');
const slides = google.slides('v1');
const { authenticate } = require('./utils');

async function applyMasterSlide(google, presentationId, masterId) {
    const auth = authenticate(google);
    const presentation = await slides.presentations.get({
        presentationId,
        auth
    });

    const master = presentation.data.slides.find(slide => slide.objectId === masterId);
    if (!master) {
        throw new Error('Master slide not found');
    }

    const requests = presentation.data.slides.map(slide => {
        return {
            updateSlideProperties: {
                objectId: slide.objectId,
                slideProperties: {
                    masterObjectId: masterId
                },
                fields: 'masterObjectId'
            }
        };
    });

    await slides.presentations.batchUpdate({
        presentationId,
        auth,
        requestBody: {
            requests
        }
    });
}

module.exports = {
    applyMasterSlide
};
