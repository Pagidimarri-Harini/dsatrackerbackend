const { errorLog } = require(__basedir + "/lib/errorHandler")
const { TopicModel } = require(__basedir + "/lib/models/FormData.js");
const { data, version } = require(__basedir + "/data/450DSAFinal");

async function insertData(user, _data) {
    try {
        const formattedData = _data.map((topic, index) => ({
            user: user,
            topicName: topic.topicName,
            position: index,
            started: topic.started,
            doneQuestions: topic.doneQuestions,
            questions: topic.questions.map((question) => ({
                Topic: question.Topic,
                Problem: question.Problem,
                Done: question.Done,
                Bookmark: question.Bookmark,
                Notes: question.Notes,
                URL: question.URL,
            })),
        }));

        const newData = await TopicModel.insertMany(formattedData);
        return newData
    } catch (error) {
        throw error;
    }
}

async function getData(req, res) {
    try {
        const existingData = await TopicModel.find({ user: req.user._id }).sort({ position: 1 });
        if (existingData.length === 0) {
            const newData = await insertData(req.user._id, data);
            res.status(200).json({ success: true, data: newData });
        } else {
            res.status(200).json({ success: true, data: existingData });
        }
    } catch (error) {
        errorLog(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function updateData(req, res) {
    try {
        const { topicData, topicPosition, rowId } = req.body;
        const id = topicData.questions[rowId]._id;

        const updatedTopic = await TopicModel.findOneAndUpdate(
            { position: topicPosition, user: req.user._id, "questions._id": id },
            {
                $set: {
                    "questions.$.Done": topicData.questions[rowId].Done,
                    "questions.$.Notes": topicData.questions[rowId].Notes,
                },
            },
            { new: true }
        );

        // Recalculate doneQuestions and started based on the updatedTopic
        const doneQuestionsCount = updatedTopic.questions.filter(question => question.Done).length;
        const startedStatus = doneQuestionsCount > 0;

        // Update the topic's doneQuestions and started fields
        await TopicModel.updateOne(
            { position: topicPosition, user: req.user._id },
            { doneQuestions: doneQuestionsCount, started: startedStatus }
        );
        res.sendStatus(204)
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

async function resetData(req, res) {
    try {
        await TopicModel.deleteMany({ user: req.user._id });
        res.sendStatus(204)
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

async function exportData(req, res) {
    try {
        const data = await TopicModel.find({ user: req.user._id });
        res.json({ data });
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

async function importData(req, res) {
    try {
        await TopicModel.deleteMany({ user: req.user._id });
        const newData = await insertData(req.user._id, req.body)
        res.status(200).json(newData)
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

module.exports = {
    insertData,
    getData,
    updateData,
    resetData,
    exportData,
    importData
};

