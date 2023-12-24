const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { google } = require('googleapis');

const themeApplication = require('./themeApplication');
const slideFormatting = require('./slideFormatting');
const imageInsertion = require('./imageInsertion');
const speakerNotesAddition = require('./speakerNotesAddition');
const masterSlideApplication = require('./masterSlideApplication');

app.use(bodyParser.json());

app.post('/applyTheme', async (req, res) => {
    const { presentationId, themeId } = req.body;
    try {
        await themeApplication.applyTheme(google, presentationId, themeId);
        res.status(200).send('Theme applied successfully');
    } catch (error) {
        res.status(500).send('Error applying theme: ' + error);
    }
});

app.post('/formatSlides', async (req, res) => {
    const { presentationId, formatParams } = req.body;
    try {
        await slideFormatting.formatSlides(google, presentationId, formatParams);
        res.status(200).send('Slides formatted successfully');
    } catch (error) {
        res.status(500).send('Error formatting slides: ' + error);
    }
});

app.post('/insertImages', async (req, res) => {
    const { presentationId, imageParams } = req.body;
    try {
        await imageInsertion.insertImages(google, presentationId, imageParams);
        res.status(200).send('Images inserted successfully');
    } catch (error) {
        res.status(500).send('Error inserting images: ' + error);
    }
});

app.post('/addSpeakerNotes', async (req, res) => {
    const { presentationId, notesParams } = req.body;
    try {
        await speakerNotesAddition.addSpeakerNotes(google, presentationId, notesParams);
        res.status(200).send('Speaker notes added successfully');
    } catch (error) {
        res.status(500).send('Error adding speaker notes: ' + error);
    }
});

app.post('/applyMasterSlide', async (req, res) => {
    const { presentationId, masterId } = req.body;
    try {
        await masterSlideApplication.applyMasterSlide(google, presentationId, masterId);
        res.status(200).send('Master slide applied successfully');
    } catch (error) {
        res.status(500).send('Error applying master slide: ' + error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
