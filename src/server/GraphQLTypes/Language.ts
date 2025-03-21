import {objectType} from "nexus";
import Context from "../context";
import {LanguageTranslateString} from "./LanguageTranslateString";

export const Language = objectType({
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
                return Context.prisma.languageTranslationStrings.findMany({
                    where: { language_id: root.id },
                });
            }
        })
    },
});