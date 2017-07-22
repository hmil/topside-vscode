'use strict';
import { atRulesCompletions } from './definitions/at-rules';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient';

class AtRuleCompletionProvider implements vscode.CompletionItemProvider {

    private getPreamble(document: vscode.TextDocument, position: vscode.Position): string {
        const wr = document.getWordRangeAtPosition(position);
        const startPos = (wr ? wr.start : position);

        // From the beginning of the line to the current word, strips litteral '@' symbols and returns the last character.
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

    // The server is implemented in node
    let serverModule = path.join(__dirname, '../server', 'server.js');
    // The debug options for the server
    let debugOptions = { execArgv: ["--nolazy", "--debug=6004"] };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    let serverOptions: ServerOptions = {
                    run : { module: serverModule, transport: TransportKind.ipc },
                    debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
    }

    // Options to control the language client
    let clientOptions: LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: ['topside'],
        synchronize: {
            // Synchronize the setting section 'languageServerExample' to the server
            configurationSection: 'languageServerExample',
            // Notify the server about file changes to '.clientrc files contain in the workspace
            fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
        }
    }

    // Create the language client and start the client.
    let disposable = new LanguageClient('languageServerExample', 'Language Server Example', serverOptions, clientOptions).start();

    // Push the disposable to the context's subscriptions so that the
    // client can be deactivated on extension deactivation
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}