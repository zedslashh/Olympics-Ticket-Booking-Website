document.addEventListener('DOMContentLoaded', function() {
    populateCountryDropdown();
    generateCaptcha();

    // Attach blur event listener to input fields for validation
    document.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('blur', function() {
            validateField(this);
        });
    });

    // Form submit event listener
    document.getElementById('registration-form').addEventListener('submit', function(event) {
        let isValid = true;

        // Validate all fields
        document.querySelectorAll('input, select').forEach(element => {
            if (!validateField(element)) {
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault(); // Prevent the form from submitting
        } else {
            alert('Tickets booked successfully');
        }
    });
});

function validateField(element) {
    const value = element.value.trim();
    const errorElement = document.getElementById(`${element.id}-error`);
    let isValid = true;

    // Clear previous error message
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    // Validation rules
    if (value === '') {
        element.setCustomValidity('Please fill out this field.');
        isValid = false;
    } else {
        element.setCustomValidity(''); // Clear custom validity

        if (element.id === 'name' && !/^[a-zA-Z\s]+$/.test(value)) {
            element.setCustomValidity('Please enter a valid name.');
            isValid = false;
        }

        if (element.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            element.setCustomValidity('Please enter a valid email address.');
            isValid = false;
        }

        if (element.id === 'country-code' && !/^\d{2,3}$/.test(value)) {
            element.setCustomValidity('Please enter a valid area code (2-3 digits).');
            isValid = false;
        }

        if (element.id === 'phone' && !/^\d{8,10}$/.test(value)) {
            element.setCustomValidity('Please enter a valid phone number (8-10 digits).');
            isValid = false;
        }

        if (element.id === 'zipcode' && !/^\d{3,6}$/.test(value)) {
            element.setCustomValidity('Please enter a valid ZIP/Postal Code (3-6 digits).');
            isValid = false;
        }

        if (element.id === 'tickets' && !/^[1-3]$/.test(value)) {
            element.setCustomValidity('Maximum of 3 tickets can be booked');
            isValid = false;
        }

        if (element.id === 'captcha-input' && value !== window.captchaText) {
            element.setCustomValidity('Captcha is incorrect.');
            isValid = false;
        }
    }

    // Trigger the built-in validation UI
    if (!isValid) {
        element.reportValidity();
        element.focus(); // Focus the field with the error
    }

    return isValid;
}

function generateCaptcha() {
    const captchaContainer = document.getElementById('captcha-container');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaText = '';
    for (let i = 0; i < 6; i++) {
        captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    window.captchaText = captchaText;
    captchaContainer.textContent = captchaText;
}

function populateCountryDropdown() {
    const countries = [
        { name: "Afghanistan", code: "af" },
        { name: "Albania", code: "al" },
        { name: "Algeria", code: "dz" },
        { name: "Andorra", code: "ad" },
        { name: "Angola", code: "ao" },
        { name: "Antigua and Barbuda", code: "ag" },
        { name: "Argentina", code: "ar" },
        { name: "Armenia", code: "am" },
        { name: "Australia", code: "au" },
        { name: "Austria", code: "at" },
        { name: "Azerbaijan", code: "az" },
        { name: "Bahamas", code: "bs" },
        { name: "Bahrain", code: "bh" },
        { name: "Bangladesh", code: "bd" },
        { name: "Barbados", code: "bb" },
        { name: "Belarus", code: "by" },
        { name: "Belgium", code: "be" },
        { name: "Belize", code: "bz" },
        { name: "Benin", code: "bj" },
        { name: "Bhutan", code: "bt" },
        { name: "Bolivia", code: "bo" },
        { name: "Bosnia and Herzegovina", code: "ba" },
        { name: "Botswana", code: "bw" },
        { name: "Brazil", code: "br" },
        { name: "Brunei", code: "bn" },
        { name: "Bulgaria", code: "bg" },
        { name: "Burkina Faso", code: "bf" },
        { name: "Burundi", code: "bi" },
        { name: "Cabo Verde", code: "cv" },
        { name: "Cambodia", code: "kh" },
        { name: "Cameroon", code: "cm" },
        { name: "Canada", code: "ca" },
        { name: "Central African Republic", code: "cf" },
        { name: "Chad", code: "td" },
        { name: "Chile", code: "cl" },
        { name: "China", code: "cn" },
        { name: "Colombia", code: "co" },
        { name: "Comoros", code: "km" },
        { name: "Congo, Democratic Republic of the", code: "cd" },
        { name: "Congo, Republic of the", code: "cg" },
        { name: "Costa Rica", code: "cr" },
        { name: "Croatia", code: "hr" },
        { name: "Cuba", code: "cu" },
        { name: "Cyprus", code: "cy" },
        { name: "Czech Republic", code: "cz" },
        { name: "Denmark", code: "dk" },
        { name: "Djibouti", code: "dj" },
        { name: "Dominica", code: "dm" },
        { name: "Dominican Republic", code: "do" },
        { name: "East Timor", code: "tl" },
        { name: "Ecuador", code: "ec" },
        { name: "Egypt", code: "eg" },
        { name: "El Salvador", code: "sv" },
        { name: "Equatorial Guinea", code: "gq" },
        { name: "Eritrea", code: "er" },
        { name: "Estonia", code: "ee" },
        { name: "Eswatini", code: "sz" },
        { name: "Ethiopia", code: "et" },
        { name: "Fiji", code: "fj" },
        { name: "Finland", code: "fi" },
        { name: "France", code: "fr" },
        { name: "Gabon", code: "ga" },
        { name: "Gambia", code: "gm" },
        { name: "Georgia", code: "ge" },
        { name: "Germany", code: "de" },
        { name: "Ghana", code: "gh" },
        { name: "Greece", code: "gr" },
        { name: "Grenada", code: "gd" },
        { name: "Guatemala", code: "gt" },
        { name: "Guinea", code: "gn" },
        { name: "Guinea-Bissau", code: "gw" },
        { name: "Guyana", code: "gy" },
        { name: "Haiti", code: "ht" },
        { name: "Honduras", code: "hn" },
        { name: "Hungary", code: "hu" },
        { name: "Iceland", code: "is" },
        { name: "India", code: "in" },
        { name: "Indonesia", code: "id" },
        { name: "Iran", code: "ir" },
        { name: "Iraq", code: "iq" },
        { name: "Ireland", code: "ie" },
        { name: "Israel", code: "il" },
        { name: "Italy", code: "it" },
        { name: "Jamaica", code: "jm" },
        { name: "Japan", code: "jp" },
        { name: "Jordan", code: "jo" },
        { name: "Kazakhstan", code: "kz" },
        { name: "Kenya", code: "ke" },
        { name: "Kiribati", code: "ki" },
        { name: "Korea, North", code: "kp" },
        { name: "Korea, South", code: "kr" },
        { name: "Kosovo", code: "xk" },
        { name: "Kuwait", code: "kw" },
        { name: "Kyrgyzstan", code: "kg" },
        { name: "Laos", code: "la" },
        { name: "Latvia", code: "lv" },
        { name: "Lebanon", code: "lb" },
        { name: "Lesotho", code: "ls" },
        { name: "Liberia", code: "lr" },
        { name: "Libya", code: "ly" },
        { name: "Liechtenstein", code: "li" },
        { name: "Lithuania", code: "lt" },
        { name: "Luxembourg", code: "lu" },
        { name: "Madagascar", code: "mg" },
        { name: "Malawi", code: "mw" },
        { name: "Malaysia", code: "my" },
        { name: "Maldives", code: "mv" },
        { name: "Mali", code: "ml" },
        { name: "Malta", code: "mt" },
        { name: "Marshall Islands", code: "mh" },
        { name: "Mauritania", code: "mr" },
        { name: "Mauritius", code: "mu" },
        { name: "Mexico", code: "mx" },
        { name: "Micronesia", code: "fm" },
        { name: "Moldova", code: "md" },
        { name: "Monaco", code: "mc" },
        { name: "Mongolia", code: "mn" },
        { name: "Montenegro", code: "me" },
        { name: "Morocco", code: "ma" },
        { name: "Mozambique", code: "mz" },
        { name: "Myanmar", code: "mm" },
        { name: "Namibia", code: "na" },
        { name: "Nauru", code: "nr" },
        { name: "Nepal", code: "np" },
        { name: "Netherlands", code: "nl" },
        { name: "New Zealand", code: "nz" },
        { name: "Nicaragua", code: "ni" },
        { name: "Niger", code: "ne" },
        { name: "Nigeria", code: "ng" },
        { name: "North Macedonia", code: "mk" },
        { name: "Norway", code: "no" },
        { name: "Oman", code: "om" },
        { name: "Pakistan", code: "pk" },
        { name: "Palau", code: "pw" },
        { name: "Panama", code: "pa" },
        { name: "Papua New Guinea", code: "pg" },
        { name: "Paraguay", code: "py" },
        { name: "Peru", code: "pe" },
        { name: "Philippines", code: "ph" },
        { name: "Poland", code: "pl" },
        { name: "Portugal", code: "pt" },
        { name: "Qatar", code: "qa" },
        { name: "Romania", code: "ro" },
        { name: "Russia", code: "ru" },
        { name: "Rwanda", code: "rw" },
        { name: "Saint Kitts and Nevis", code: "kn" },
        { name: "Saint Lucia", code: "lc" },
        { name: "Saint Vincent and the Grenadines", code: "vc" },
        { name: "Samoa", code: "ws" },
        { name: "San Marino", code: "sm" },
        { name: "Sao Tome and Principe", code: "st" },
        { name: "Saudi Arabia", code: "sa" },
        { name: "Senegal", code: "sn" },
        { name: "Serbia", code: "rs" },
        { name: "Seychelles", code: "sc" },
        { name: "Sierra Leone", code: "sl" },
        { name: "Singapore", code: "sg" },
        { name: "Slovakia", code: "sk" },
        { name: "Slovenia", code: "si" },
        { name: "Solomon Islands", code: "sb" },
        { name: "Somalia", code: "so" },
        { name: "South Africa", code: "za" },
        { name: "South Sudan", code: "ss" },
        { name: "Spain", code: "es" },
        { name: "Sri Lanka", code: "lk" },
        { name: "Sudan", code: "sd" },
        { name: "Suriname", code: "sr" },
        { name: "Sweden", code: "se" },
        { name: "Switzerland", code: "ch" },
        { name: "Syria", code: "sy" },
        { name: "Taiwan", code: "tw" },
        { name: "Tajikistan", code: "tj" },
        { name: "Tanzania", code: "tz" },
        { name: "Thailand", code: "th" },
        { name: "Togo", code: "tg" },
        { name: "Tonga", code: "to" },
        { name: "Trinidad and Tobago", code: "tt" },
        { name: "Tunisia", code: "tn" },
        { name: "Turkey", code: "tr" },
        { name: "Turkmenistan", code: "tm" },
        { name: "Tuvalu", code: "tv" },
        { name: "Uganda", code: "ug" },
        { name: "Ukraine", code: "ua" },
        { name: "United Arab Emirates", code: "ae" },
        { name: "United Kingdom", code: "gb" },
        { name: "United States", code: "us" },
        { name: "Uruguay", code: "uy" },
        { name: "Uzbekistan", code: "uz" },
        { name: "Vanuatu", code: "vu" },
        { name: "Vatican City", code: "va" },
        { name: "Venezuela", code: "ve" },
        { name: "Vietnam", code: "vn" },
        { name: "Yemen", code: "ye" },
        { name: "Zambia", code: "zm" },
        { name: "Zimbabwe", code: "zw" }
    ];

    const countrySelect = document.getElementById('country');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });
}
