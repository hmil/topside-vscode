import { CompletionItem, CompletionItemKind, SnippetString } from 'vscode';

export const atRulesCompletions: CompletionItem[] = [
    {
        label: "@(value)",
        filterText: "text",
        kind: CompletionItemKind.Keyword,
        insertText: new SnippetString("(${1:value})"),
        documentation: "Inserts a value (html-escaped)."
    },
    {
        label: "@html(value)",
        filterText: "html",
        kind: CompletionItemKind.Keyword,
        insertText: new SnippetString("html(${1:value})"),
        documentation: "Inserts a raw, unescaped value (use only to display trusted html content).",
    },
    {
        label: "@for (it of collection)",
        filterText: "foreachof",
        kind: CompletionItemKind.Keyword,
        insertText: new SnippetString("for (${1:it} of ${2:collection})\n\t$3\n@endfor"),
        documentation: "Repeats some markup for each item in an array."
    },
    {
        label: "@for (i ; i < x ; i++)",
        filterText: "forijk=0123456789;i<",
        kind: CompletionItemKind.Keyword,
        insertText: new SnippetString("for (${1:i} = ${2:0} ; $1 < ${3:10} ; $1++)\n\t$4\n@endfor"),
        documentation: "Repeats some markup for i in a numeric range."
    },
    {
        label: "@endfor",
        filterText: "endfor",
        insertText: "endfor",
        kind: CompletionItemKind.Keyword
    },
    {
        label: "@if",
        filterText: "@if",
        kind: CompletionItemKind.Keyword,
        insertText: new SnippetString("if ($1)\n\t$2\n@endif"),
        documentation: "Conditionnally renders some markup."
    },
    {
        label: "@if/@else",
        filterText: "if/else",
        kind: CompletionItemKind.Keyword,
        insertText: new SnippetString("if ($1)\n\t$2\n@else\n\t$3\n@endif"),
        documentation: "Conditionnally renders some markup."
    },
    {
        label: "@if/@elseif/@else",
        filterText: "if/elseif/else",
        kind: CompletionItemKind.Keyword,
        insertText: new SnippetString("if ($1)\n\t$2\n@elseif ($3)\n\t$4\n@else\n\t$5\n@endif")
    },
    {
        label: "@elseif",
        filterText: "elseif",
        kind: CompletionItemKind.Keyword,
        insertText: new SnippetString("elseif ($1)")
    },
    {
        label: "@else",
        filterText: "else",
        kind: CompletionItemKind.Keyword
    },
    {
        label: "@endif",
        filterText: "endif",
        kind: CompletionItemKind.Keyword
    },
    {
        label: "@import",
        filterText: "import",
        kind: CompletionItemKind.Keyword,
        insertText: new SnippetString("import $1 from '$2'"),
        documentation: "Imports some type definitions used in the template."
    },
    {
        label: "@param",
        filterText: "param",
        kind: CompletionItemKind.Keyword,
        insertText: new SnippetString("param ${1:name}: ${2:type}"),
        documentation: "Defines an input parameter for this template."
    }
]