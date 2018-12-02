var db = require('./db');
db.initCollection('items');
db.initCollection('transactions');
db.initCollection('users');

module.exports = {
    createItem: createItem,
    getItems: getItems,
    findItem: findItem,
    placeOrder: placeOrder,
    getTransactions: getTransactions
};

function createItem(req, res) {
    try {
        var Item = {
            name: req.body.name,
            price: req.body.price
        };
        var neededObject = db.createObject('items', Item);
        return res.status(200).json(neededObject._id);
    } catch (error) {
        var errormessage = error.message;
        const response = {
            message: errormessage
        }
        return res.status(400).json(response);
    }
}

function getItems(req, res) {
    try {
        var neededObjects = db.getObjects('items');
        return res.status(200).json(neededObjects);
    } catch (error) {
        var errormessage = error.message;
        const response = {
            message: errormessage
        }
        return res.status(400).json(response);
    }
}

function findItem(req, res) {
    try {
        var itemName = req.params.itemName;
        var neededObject = db.getObject('items', itemName);
        return res.status(200).json(neededObject);
    } catch (error) {
        var errormessage = error.message;
        const response = {
            message: errormessage
        }
        return res.status(400).json(response);
    }
}

//place an order with business logic
function placeOrder(req, res) {
    try {
        var date = new Date();
        var orderedItem = {
            username: req.body.username,
            item: req.body.item,
        }
        var item = db.getObject('items', { name: orderedItem.item });
        var user = db.getObject('users', { username: orderedItem.username })
        if (item.price > user.balance) {
            const response = "Not enough money";
            return res.status(400).send(response);
        } else {
            var updatedUser = {
                username: user.username,
                password: user.password,
                balance: user.balance - item.price
            };
            db.updateObject('users', { username: user.username }, updatedUser);
            var transactionToAdd = {
                username: user.username,
                item: item.name,
                price: item.price,
                date: date
            }
            db.createObject('transactions', transactionToAdd)
            var newOrder = db.getObject('transactions', { username: transactionToAdd.username, date: transactionToAdd.date })
            return res.status(200).json(newOrder);
        }
    } catch (error) {
        var errormessage = error.message;
        const response = {
            message: errormessage
        }
        return res.status(400).json(response);
    }
}

function getTransactions(req, res) {
    try {
        var username = req.swagger.params.username.value;
        var userTransactions = db.getObjects('transactions', { username: username });

        return res.status(200).json(userTransactions);
    } catch (error) {
        var errormessage = error.message;
        const response = {
            message: errormessage
        }
        return res.status(400).json(response);
    }
}