
module.exports = {
    resource:function(req,res){
        var course_id    = req.params.course_id;
        var resource_ids = req.body.resource_ids;
        var Resource = global.db.models.resource;
        for(var index in resource_ids){
            var resource_id = resource_ids[index];
            console.log(resource_id);
        }
    }
};