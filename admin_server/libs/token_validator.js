/**
 * Created by heavenduke on 16-5-17.
 */

var TokenValidator = {};

TokenValidator.token_length = 64;

TokenValidator.alphabet = "1234567890qwertyuiopasdfghjklzxcvbnm_-QWERTYUIOPASDFGHJKLZXCVBNM";

TokenValidator.generate_random_character = function () {
    var index = Math.floor((Math.random() * TokenValidator.alphabet.length));
    return TokenValidator.alphabet.charAt(index);
};

TokenValidator.construct_access_token = function () {
    var result = "";
    for (var i = 0; i < TokenValidator.token_length; i++) {
        result += TokenValidator.generate_random_character();
    }
    return result;
};

TokenValidator.construct_refresh_token = function () {
    var result = "";
    for (var i = 0; i < TokenValidator.token_length; i++) {
        result += TokenValidator.generate_random_character();
    }
    return result;
};

TokenValidator.construct_confirm_token = function () {
    var result = "";
    for (var i = 0; i < TokenValidator.token_length; i++) {
        result += TokenValidator.generate_random_character();
    }
    return result;
};

module.exports = TokenValidator;