const router = require("express").Router();
const verify = require("../routes/verifyToken");
const Listing = require("../models/Listing");
// Add New Listings
router.post("/", verify, async (req, res) => {
    // res.send('Add New Listings');
    const listing = new Listing({
        title: req.body.title,
        price: req.body.price,
        locality: req.body.locality,
        details: req.body.details
    });

    try {
        const savedListing = await listing.save();
        res.send(savedListing);
    } catch (error) {
        req.status(400).send(error);
    }
});

// Get All Listings
router.get("/", async (req, res) => {
    // res.send('All Listings');
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (error) {
        res.json({
            message: error
        });
    }
});

// Get Single Listings
router.get("/:listingId", async (req, res) => {
    // res.send('Single Listings');
    try {
        const listing = await Listing.findById(req.params.listingId);
        res.json(listing);
    } catch (error) {
        res.json({
            message: error
        });
    }
});

// Update Listings
router.put("/:listingId", async (req, res) => {
    // res.send('Update Listings');
    try {
        const listing = {
            title: req.body.title,
            price: req.body.price,
            locality: req.body.locality,
            details: req.body.details
        };

        const updatedListing = await Listing.findByIdAndUpdate({
                _id: req.params.listingId
            },
            listing
        );
        res.json(updatedListing);
    } catch (error) {
        res.json({
            message: error
        });
    }
});

// Delete Listings
router.delete("/:listingId", async (req, res) => {
    // res.send('Delete Listings');
    try {
        const removeListing = await Listing.findByIdAndDelete(req.params.listingId);
        res.json(removeListing);
    } catch (error) {
        res.json({
            message: error
        });
    }
});


module.exports = router;