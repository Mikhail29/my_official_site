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
        })
    }
});

const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('email')
        t.string('name')
        t.string('biography')
    },
});

export const schema = makeSchema({
    types: [
        Query,
        User,
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