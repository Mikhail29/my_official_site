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
import {Language} from "./GraphQLTypes/Language";
import {User} from "./GraphQLTypes/User";
import {LanguageTranslateString} from "./GraphQLTypes/LanguageTranslateString";

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