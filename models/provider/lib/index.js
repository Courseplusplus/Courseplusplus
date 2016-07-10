/**
 * Created by rikoizz on 16-7-8.
 */

var items = [];
var For = function(list, func, _begin, _end, response, res){
    if (_begin == 0) items = [];
    if (_begin == _end){
        res.submits = items;
        response.json({data: res});
    } else {
        func(list[_begin].team_id).then(function(team){
            items.push({
                team: team,
                submit: list[_begin]
            });
            return For(list, func, _begin + 1, _end, response, res);
        });
    }
};
module.exports = {
    For : For
};