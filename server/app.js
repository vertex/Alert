/* @flow */

import webpackDevMiddleware from "webpack-dev-middleware";
import webpack from "webpack";
import webpackConfig from "../webpack.config.js";
import express from "express";
import path from "path";
import filter from "lodash/filter";

import alertGenerator from "../data/alerts";

var compiler = webpack(webpackConfig);
var app = express();
app.use(webpackDevMiddleware(compiler));

app.use(express.static(path.join(__dirname + "/../public")));
app.get("/alerts", function(req, res) {
    //copy all data into a temporary array
    var filtered = alerts.slice();

    // implement: query
    // filter the data based on some query
    if (req.query.query) {
        filtered = filter(filtered, JSON.parse(req.query.query));
    }

    // implement: sortBy
    // sort the data based on a certain field
    if (req.query.sortBy) {
        filtered.sort(function(a, b) {
            return a[req.query.sortBy] - b[req.query.sortBy];
        });
    }

    // implement: offset
    // the start of the result set from zero
    if (req.query.offset) {
        filtered = filtered.splice(parseInt(req.query.offset, 10) || 0);
    }

    // implement: limit
    // limit the number of returned results to the limit or 10 by default
    filtered = filtered.splice(0, parseInt(req.query.limit, 10) || 10);

    res.send({
        data: filtered,
        total: alerts.length,
        limit: parseInt(req.query.limit, 10) || 10,
        offset: parseInt(req.query.offset, 10) || 0,
        sortBy: req.query.sortBy || undefined,
        query: req.query.query ? JSON.parse(req.query.query) : undefined
    });
});
var alerts = alertGenerator();

app.listen(8080, function() {
    console.log("Example app listening on port 3000!");
});
