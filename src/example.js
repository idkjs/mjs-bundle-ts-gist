"use strict";
exports.__esModule = true;
// Example application
var builder_1 = require("./builder");
var personBuilder = builder_1.builder({ defaultValues: { forename: "(unknown)", surname: "(unknown)" } });
var addressBuilder = builder_1.builder({ defaultValues: {} });
// inferred type: Person
var daniel = personBuilder["with"]({ forename: 'Daniel', surname: 'Dietrich' }) // setting multiple attributes at once
["with"]({ phone: 123 })["with"]({ address: [
        addressBuilder["with"]({ street: 'Milkyway', country: 'foo' }).build(),
        addressBuilder["with"]({ street: 'Elmstreet', country: 'bar' }).build()
    ] })
    .build();
console.log(daniel);
