/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import {
    IPCMessageReader, IPCMessageWriter,
    createConnection, IConnection,
    TextDocuments, Diagnostic, DiagnosticSeverity, InitializeResult
} from 'vscode-languageserver';

import { compiler } from 'topside';

// Create a connection for the server. The connection uses Node's IPC as a transport
let connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process));

// Create a simple text document manager. The text document manager
// supports full document sync only
let documents: TextDocuments = new TextDocuments();
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// After the server has started the client sends an initialize request. The server receives
// in the passed params the rootPath of the workspace plus the client capabilities. 
let workspaceRoot: string | null | undefined;
connection.onInitialize((params): InitializeResult => {
    workspaceRoot = params.rootPath;
    return {
        capabilities: {
            // Tell the client that the server works in FULL text document sync mode
            textDocumentSync: documents.syncKind
        }
    };
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
    let diagnostics: Diagnostic[] = [];
    try {
        compiler.compile(change.document.getText(), {
            file: change.document.uri
        });
    } catch (e) {
        if (e.name === "CompileError") {
            diagnostics.push({
                severity: DiagnosticSeverity.Error,
                range: {
                    start: { line: e.line - 1, character: e.ch },
                    end: { line: e.line - 1, character: e.ch }
                },
                message: e.message,
                source: "topside"
            });
        }
    }
    // Send the computed diagnostics to VS Code.
    connection.sendDiagnostics({ uri: change.document.uri, diagnostics });
});

// Listen on the connection
connection.listen();
