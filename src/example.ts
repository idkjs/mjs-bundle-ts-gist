// Example application
import {builder} from './builder'

type Person = {
    forename: string
    surname: string
    phone?: number
    address?: Address[]
}

type Address = {
    street?: string
    zip?: number
    city?: string
    country?: 'foo' | 'bar' | 'baz'
}

const personBuilder = builder<Person>({ defaultValues: { forename: "(unknown)", surname: "(unknown)" }});
const addressBuilder = builder<Address>({ defaultValues: {}});

// inferred type: Person
const daniel = personBuilder
    .with({ forename: 'Daniel', surname: 'Dietrich' }) // setting multiple attributes at once
    .with({ phone: 123 })
    .with({ address: [
        addressBuilder.with({ street: 'Milkyway', country: 'foo' }).build(), // setting only some optional attributes
        addressBuilder.with({ street: 'Elmstreet', country: 'bar' }).build()
    ]})
    .build();

console.log(daniel)
