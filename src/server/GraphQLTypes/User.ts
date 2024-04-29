import {objectType} from "nexus";


export const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.int('id');
        t.string('email');
        t.string('telegram_key');
        t.nonNull.string('nickname');
        t.string('name');
        t.string('last_name');
        t.string('patronymic');
        t.string('birthday');
    },
});