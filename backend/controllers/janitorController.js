const Janitor = require('../models/janitor');

// GET all janitors
const getAllJanitors = async (req, res) => {
    try {
        const janitors = await Janitor.find({});
        res.status(200).json(janitors);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch janitors', error: error.message });
    }
};

// GET a single janitor
const getJanitorById = async (req, res) => {
    try {
        const janitor = await Janitor.findById(req.params.id);
        if (janitor) {
            res.json(janitor);
        } else {
            res.status(404).json({ message: 'Janitor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST a new janitor
const createJanitor = async (req, res) => {
    const janitor = new Janitor(req.body);
    try {
        const newJanitor = await janitor.save();
        res.status(201).json(newJanitor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE a janitor
const updateJanitor = async (req, res) => {
    try {
        const janitor = await Janitor.findById(req.params.id);
        if (janitor) {
            Object.assign(janitor, req.body);
            const updatedJanitor = await janitor.save();
            res.json(updatedJanitor);
        } else {
            res.status(404).json({ message: 'Janitor not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// UPDATE janitor schedule status
const updateScheduleStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const janitorId = req.params.id;
        
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        // Validate status
        const validStatuses = ['Early', 'On Time', 'Over Time'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const janitor = await Janitor.findById(janitorId);
        
        if (!janitor) {
            return res.status(404).json({ message: 'Janitor not found' });
        }

        // Update the schedule status
        janitor.schedule.status = status;
        const updatedJanitor = await janitor.save();

        res.json({ 
            message: 'Status updated successfully',
            status: updatedJanitor.schedule.status 
        });

    } catch (error) {
        console.error('Error updating schedule status:', error);
        res.status(500).json({ message: error.message });
    }
};

// DELETE a janitor
const deleteJanitor = async (req, res) => {
    try {
        const janitor = await Janitor.findById(req.params.id);
        if (janitor) {
            await janitor.remove();
            res.json({ message: 'Janitor deleted' });
        } else {
            res.status(404).json({ message: 'Janitor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllJanitors,
    getJanitorById,
    createJanitor,
    updateJanitor,
    updateScheduleStatus,
    deleteJanitor
};