var data = require('./data');

//console.log("INIT DATA", data);
exports.update = function update(req, res){
        console.log("BUTTON", req.body);

        var up = data
                .chain()
                .find(data.start, data.timer, data.actionsMore, data.actionsLess)
                .assign({
                  start: req.body.start,
                  timer: req.body.timer,
                  actionsMore: req.body.actionsMore,
                  actionsLess: req.body.actionsLess
                })
                .value();

        res.json(up);
        console.log("CHANGE", up);

}
