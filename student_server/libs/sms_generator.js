/**
 * Created by heavenduke on 16-5-25.
 */

var SMS_Generator = {};

SMS_Generator.alphabet = "1234567890";

SMS_Generator.generate_random_character = function () {
    var index = Math.floor((Math.random() * SMS_Generator.alphabet.length));
    return SMS_Generator.alphabet.charAt(index);
};

SMS_Generator.generate_sms = function (length) {
    var result = "";
    var sms_length = length ? length : 6;
    for (var i = 0; i < sms_length; i++) {
        result += SMS_Generator.generate_random_character();
    }
    return result;
};

module.exports = SMS_Generator;