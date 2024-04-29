import {objectType} from "nexus";
import Context from "../context";
import {Language} from "./Language";


export const LanguageTranslateString = objectType({
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