// imageInsertion.js

const { google } = require('googleapis');
const slides = google.slides('v1');

async function insertImages(auth, presentationId, imageParams) {
    const requests = [];

    for (let slideId in imageParams) {
        let imageUrl = imageParams[slideId];

        let request = {
            createImage: {
                url: imageUrl,
                elementProperties: {
                    pageObjectId: slideId,
                    size: {
                        height: {
                            magnitude: 350,
                            unit: 'PT'
                        },
                        width: {
                            magnitude: 350,
                            unit: 'PT'
                        }
                    },
                    transform: {
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 350,
                        translateY: 100,
                        unit: 'PT'
                    }
                }
            }
        };

        requests.push(request);
    }

    const batchUpdateRequest = {
        requests
    };

    try {
        await slides.presentations.batchUpdate({
            presentationId,
            resource: batchUpdateRequest,
            auth
        });
    } catch (error) {
        console.log('The API returned an error: ' + error);
    }
}

module.exports = {
    insertImages
};
