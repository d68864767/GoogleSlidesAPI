// slideFormatting.js

const { google } = require('googleapis');
const slides = google.slides('v1');

async function formatSlides(auth, presentationId, formatParams) {
    const requests = [];

    for (let slideId in formatParams) {
        const slideParams = formatParams[slideId];

        const request = {
            updateTextStyle: {
                objectId: slideId,
                style: {
                    foregroundColor: {
                        opaqueColor: {
                            rgbColor: slideParams.color,
                            alpha: slideParams.alpha
                        }
                    },
                    fontScale: slideParams.fontScale,
                    bold: slideParams.bold,
                    italic: slideParams.italic,
                    underline: slideParams.underline,
                    strikethrough: slideParams.strikethrough,
                    smallCaps: slideParams.smallCaps,
                    baselineOffset: slideParams.baselineOffset,
                    link: slideParams.link
                },
                textRange: {
                    type: 'ALL'
                },
                fields: 'foregroundColor,fontScale,bold,italic,underline,strikethrough,smallCaps,baselineOffset,link'
            }
        };

        requests.push(request);
    }

    const response = await slides.presentations.batchUpdate({
        auth: auth,
        presentationId: presentationId,
        resource: {
            requests: requests
        }
    });

    return response;
}

module.exports = {
    formatSlides: formatSlides
};
