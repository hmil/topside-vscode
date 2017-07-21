'use strict';
import { atRulesCompletions } from './definitions/at-rules';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class AtRuleCompletionProvider implements vscode.CompletionItemProvider {

    private getPreamble(document: vscode.TextDocument, position: vscode.Position): string {
        const wr = document.getWordRangeAtPosition(position);
        const startPos = (wr ? wr.start : position);

        // From the beginning of the line to the current word, strips litteral '@' symbols and returns the las character.
        return document.getText(new vscode.Range(startPos.with(undefined, 0), startPos))
                .replace(/@@/g, '')
                .substr(-1);
    }

    public provideCompletionItems(
            document: vscode.TextDocument, 
            position: vscode.Position, 
            _token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.CompletionItem[]> {
        // This prevents suggestions from showing up unless an @rule is being typed
        if (this.getPreamble(document, position) !== '@') {
            return;
        }
        
        return atRulesCompletions;
    }
}

// Plugin initialization
export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider('topside', new AtRuleCompletionProvider(), '@')
    );
}

// this method is called when your extension is deactivated
export function deactivate() {
}