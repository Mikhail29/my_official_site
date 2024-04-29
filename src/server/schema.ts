import {
    intArg,
    makeSchema,
    nonNull,
    objectType,
    stringArg,
    inputObjectType,
    arg,
    asNexusMethod,
    enumType,
} from 'nexus';
import Context from "./context";

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('allUsers', {
            type: 'User',
            resolve: (_parent, _args) => {
                return Context.prisma.user.findMany()
            },
        });
        t.nonNull.field('me', {
            type: 'User',
            resolve: (_parent, _args) => {
                return Context.prisma.user.findFirst({
                    where: { id: 1 },
                });
            },
        });
        t.nonNull.list.field('getLanguages', {
            type: 'Language',
            resolve: (_parent, _args) => {
                return Context.prisma.language.findMany()
            }
        });
    }
});

const User = objectType({
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

const Language = objectType({
    name: 'Language',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
        t.nonNull.string('code');
        t.nonNull.string('country');
        t.boolean('is_default');
        t.list.field('translates', {
            type: LanguageTranslateString,
            resolve: (root, args, ctx) => {
                return Context.prisma.languageTranslateString.findMany({
                    where: { language_id: root.id },
                });
            }
        })
    },
});

const LanguageTranslateString = objectType({
    name: 'languageTranslateString',
    definition(t) {
        t.nonNull.int('language_id');
        t.nonNull.string('key');
        t.nonNull.string('value');
        t.field("language", {
            type: Language,
            resolve: (root, args, ctx) => {
                return Context.prisma.findFirst({
                    where: { id: root.language_id }
                })
            }
        });
    }
})

export const schema = makeSchema({
    types: [
        Query,
        User,
        Language,
        LanguageTranslateString,
    ],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    contextType: {
        module: require.resolve('./context'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma',
            },
        ],
    },
})