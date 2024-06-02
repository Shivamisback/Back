const express = require('express');
const { addManhwa, getAllManhwas, getManhwaById } = require('../controllers/manhwaController');
const { auth, adminAuth } = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Add new Manhwa (admin only)
router.post('/', auth, adminAuth, upload.single('coverImage'), addManhwa);

// Get all Manhwas
router.get('/', getAllManhwas);

// Get Manhwa by ID
router.get('/:id', getManhwaById);

module.exports = router;
