/**
 * Created by heavenduke on 16-5-17.
 */

var crypto = require('crypto');
var PasswordValidator = {};

PasswordValidator.validate_confirm_password = function (password, confirm_password) {
    return password == confirm_password;
};

PasswordValidator.encrypt_password = function (password) {
    var generate_nonce_str = function (bits) {
        var result = "";
        var generateRandom = function (alphabet) {
            var index = Math.floor((Math.random() * alphabet.length));
            return alphabet.charAt(index);
        };
        var alphabet = "1234567890qwertyuiopasdfghjklzxcvbnm";
        for (var i = 0; i < bits; i++) {
            result += alphabet.charAt(generateRandom(alphabet));
        }
        return result;
    };
    var method = "md5";
    var nonce_str = generate_nonce_str(8);
    var md5 = crypto.createHash(method);
    md5.update(nonce_str + password);
    var encrypted_password = md5.digest('hex');
    return method + "$" + nonce_str + "$" + encrypted_password;
};

PasswordValidator.is_password_valid = function (encoded_password, password) {
    var params = encoded_password.split("$");
    var method = params[0];
    var nonce_str = params[1];
    var correct_encrypted_password = params[2];
    var md5 = crypto.createHash(method);
    md5.update(nonce_str + password);
    var encrypted_password = md5.digest("hex");
    return correct_encrypted_password == encrypted_password;
};

module.exports = PasswordValidator;