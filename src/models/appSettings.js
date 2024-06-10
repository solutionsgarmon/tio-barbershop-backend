const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
     logo: {
        type: String,
    },
       typography: {
        type: String,
    },

 social_media: [{
        facebook: {
            type: String,
            required: true
        },
        instagram: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: true
        },
        email: {
            type: String,     
        }
    }],
    main_slider: [{
        image: {
            type: String,
           
        },
        principal_text: {
            type: String,
           
        },
        secondary_text: {
            type: String,
          
        },
        buttonText: {
            type: String,     
        },
            posicion: {
        type: String,
    },
       link_button: {
        type: String,
    },
    }],
 colors: [{
        main_color: {
            type: String,
            required: true
        },
        secondary_color: {
            type: String,
            required: true
        },

    }],
});

const Settings = mongoose.model('settings', userSchema);

module.exports = Settings;
