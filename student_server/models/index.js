/**
 * Created by Obscurity on 2016/4/5.
 */

var Sequelize = require('sequelize');
var path = require('path');

module.exports = function (database, username, password, config) {
    var sequelize = new Sequelize(database, username, password, config);

    var User = sequelize.import(path.join(__dirname, 'objects/user'));
    var Friend = sequelize.import(path.join(__dirname, 'objects/friend'));
    var FriendApplication = sequelize.import(path.join(__dirname, 'objects/friend_application'));
    var Group = sequelize.import(path.join(__dirname, 'objects/group'));
    var Membership = sequelize.import(path.join(__dirname, 'objects/membership'));
    var Chat = sequelize.import(path.join(__dirname, 'objects/chat'));

    Group.belongsToMany(User, {through: Membership, foreignKey: "group_id"});
    User.belongsToMany(Group, {through: Membership, foreignKey: "user_id"});

    User.belongsToMany(User, {as: "senders", through: FriendApplication, foreignKey: "launcher_id"});
    User.belongsToMany(User, {as: "receivers", through: FriendApplication, foreignKey: "receiver_id"});

    User.belongsToMany(User, {as: "selves", through: Friend, foreignKey: "user_id"});
    User.belongsToMany(User, {as: "friends", through: Friend, foreignKey: "friend_user_id"});

    User.hasMany(Chat, {as: "sender", foreignKey: "sender_id"});
    User.hasOne(Chat, {as: "receiver", foreignKey: "receiver_id"});

    Chat.belongsTo(User, {as: "sent_chats", foreignKey: "sender_id"});
    Chat.belongsTo(User, {as: "received_chats", foreignKey: "receiver_id"});
    Chat.belongsTo(Group, {foreignKey: "group_id"});
    Group.hasMany(Chat, {foreignKey: "group_id"});

    return sequelize;
};