var tool = require('../download/libs/tool');
module.exports = {
    index: function (req, res) {
        tool.getList(res, req.params.assignment_id);
    }
};