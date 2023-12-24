// speakerNotesAddition.js

const { google } = require('googleapis');
const slides = google.slides('v1');

async function addSpeakerNotes(auth, presentationId, notesParams) {
    const requests = [];

    for (let slideId in notesParams) {
        if (notesParams.hasOwnProperty(slideId)) {
            let note = notesParams[slideId];

            let request = {
                createSlide: {
                    objectId: slideId,
                    slideLayoutReference: {
                        predefinedLayout: 'BLANK'
                    },
                    placeholderIdMappings: [
                        {
                            layoutPlaceholder: {
                                type: 'BODY',
                                index: 0
                            },
                            objectId: 'MyNotes'
                        }
                    ]
                },
                createParagraphBullets: {
                    objectId: 'MyNotes',
                    textRange: {
                        type: 'ALL'
                    },
                    bulletPreset: 'BULLET_ARROW_DIAMOND_DISC'
                },
                insertText: {
                    objectId: 'MyNotes',
                    insertionIndex: 0,
                    text: note
                }
            };

            requests.push(request);
        }
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
    addSpeakerNotes
};
