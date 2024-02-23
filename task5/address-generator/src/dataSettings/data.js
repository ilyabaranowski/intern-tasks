import {fakerDE_AT, fakerEN_CA, fakerPT_PT} from '@faker-js/faker';
import * as R from 'ramda'

const locales = {
    'de_AT': { title: 'Austria', lib: fakerDE_AT },
    'en_CA': { title: 'Canada', lib: fakerEN_CA },
    'pt_PT': { title: 'Portugal', lib: fakerPT_PT },
}

export const availableLocales = Object.entries(locales).map(([key, value]) => ({ title: value.title, value: key }))

const generated = []
const generatedSettings = {}

function randomAddress(faker) {
    const randomAddress = {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.county(),
        zipCode: faker.location.zipCode(),
        country: faker.location.country(),
    };

    return `${randomAddress.street}, ${randomAddress.city}`
}

const randomName = (faker) => faker.person.fullName()
const randomPhone = (faker) => faker.phone.number()

function user(index = 0, faker) {

    return {
        index: index + 1,
        id: faker.string.uuid(),
        name: randomName(faker),
        phone: randomPhone(faker),
        address: randomAddress(faker),
    }
}

const getUser = (index, faker) => {
    if (!generated[index]) {
        generated[index] = user(index, faker)
    }

    return generated[index]
}


export function generateUsers(length, startIndex = 0, settings) {
    if (JSON.stringify(settings) !== JSON.stringify(generatedSettings)) {
        console.log('changing settings', settings, generatedSettings)

        for (const [key, value] of Object.entries(settings)) {
            generated.length = 0
            generatedSettings[key] = value;
        }
    }

    const faker = locales[settings.region].lib;
    faker.seed([settings.seed, startIndex]);

    const users = Array.from({ length }).map((_, i) => getUser(i + startIndex, faker))

    return generateErrors(users, faker)
}

function generateErrors(users, faker) {
    const errCountInt = Math.trunc(generatedSettings.errorsCount)

    const fields = {
        name: faker.helpers.multiple(() => randomName(faker), { count: 1000 }).join(''),
        phone: faker.helpers.multiple(() => randomPhone(faker), { count: 1000 }).join(''),
        address: faker.helpers.multiple(() => randomAddress(faker), { count: 1000 }).join(''),
    }
    const errorAction = {
        Delete: (str, idx) => str.substring(0, idx % str.length) + str.substring(idx % str.length + 1),
        Add: (str, idx, filed) => {
            const char = fields[filed][faker.number.int() % fields[filed].length]
            return str.substring(0, idx % str.length) + char + str.substring(idx % str.length)
        },
        Swap: (str, idx) => {
            let i = idx % (str.length - 1)
            return R.swap(i, i + 1, str.split('')).join('')
        }
    }

    return users.map((row) => {
        const errCount = errCountInt + (faker.helpers.maybe(() => 1, { probability: generatedSettings.errorsCount - errCountInt }) ?? 0)
        const actions = faker.helpers.multiple(() => [faker.helpers.objectValue(errorAction), faker.helpers.objectKey(fields), faker.number.int()], { count: errCount })

        for (let [f, field, pos] of actions) {
            row[field] = f(row[field], pos, field)
        }

        return row

    })
}
