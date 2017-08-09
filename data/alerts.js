var faker = require("faker");

module.exports = function() {
    var alerts = [];

    for (var i = 0; i < 9999; i++) {
        alerts.push({
            key: faker.random.uuid(),
            meta: {
                account: {
                    id: faker.random.uuid(),
                    name: faker.company.companyName()
                }
            },
            severity: faker.random.arrayElement(["minor", "major", "critical"]),
            number: faker.random.number()
        });
    }
    return alerts;
};
