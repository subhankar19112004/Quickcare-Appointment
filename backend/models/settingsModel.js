import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    websiteLogo: {
        type: String, // URL or path to the logo image
        default: ""  // Default empty if no logo is provided
    },
    websiteTitle: {
        type: String,
        required: true,
        default: "My Healthcare Portal" // Default website title
    },
    contactInfo: {
        email: {
            type: String,
            required: true,
            default: "contact@example.com" // Default email address
        },
        phone: {
            type: String,
            required: true,
            default: "+1 234 567 890" // Default phone number
        },
        address: {
            type: String,
            required: true,
            default: "123 Healthcare St, City, Country" // Default address
        }
    },
    smtpConfig: {
        host: {
            type: String,
            default: "smtp.example.com" // Default SMTP server address
        },
        port: {
            type: Number,
            default: 587 // Default SMTP port
        },
        user: {
            type: String,
            default: "user@example.com" // SMTP username
        },
        pass: {
            type: String,
            default: "" // SMTP password (can be empty initially)
        }
    },
    timeZone: {
        type: String,
        default: "UTC" // Default time zone
    },
    currency: {
        type: String,
        default: "INR" // Default currency (Indian Rupee)
    }
}, { timestamps: true });

const settingsModel = mongoose.model('settings', settingsSchema);
export default settingsModel;
