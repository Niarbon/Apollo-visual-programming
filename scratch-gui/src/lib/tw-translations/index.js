import twTranslations from './generated-translations.json';

// Project-owned overrides for keys that upstream scratch-l10n leaves untranslated.
// Keyed by lowercased locale. These are applied last so they always win.
const additionalTranslations = {
    'zh-cn': {
        'gui.menuBar.settings': '设置',
        'gui.menuBar.language': '语言'
    },
    'zh-tw': {
        'gui.menuBar.settings': '設定',
        'gui.menuBar.language': '語言'
    }
};

const addAdditionalTranslations = editorMessages => {
    for (const locale of Object.keys(editorMessages)) {
        const toMixIn = twTranslations[locale.toLowerCase()];
        if (toMixIn) {
            Object.assign(editorMessages[locale], toMixIn);
        }
        const overrides = additionalTranslations[locale.toLowerCase()];
        if (overrides) {
            Object.assign(editorMessages[locale], overrides);
        }
    }

    // We reuse our `es` translations for `es-419` instead of maintaining separate translations.
    Object.assign(editorMessages['es-419'], twTranslations.es);
};

export default addAdditionalTranslations;
