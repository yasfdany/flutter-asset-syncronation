import * as vscode from 'vscode';
import * as fs from "fs";   
import { Uri } from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "asset-syncronation" is now active!');
	
	let disposable = vscode.commands.registerCommand('asset-syncronation.syncronation', () => {
		var toCamelCase = function(str : string) {
			return str.toLowerCase()
			  .replace( /['"]/g, '' )
			  .replace( /\W+/g, ' ' )
			  .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
			  .replace( / /g, '' );
		  };

		vscode.workspace.workspaceFolders?.map((folder) => {
			vscode.workspace.openTextDocument(Uri.parse(folder.uri.path+"/pubspec.yaml")).then((document) => {
				let text = document.getText();
				let texts = text.split("\n");
				let startPos = texts.indexOf("    # assets-generator-begin");
				let endPos = texts.indexOf("    # assets-generator-end");

				let paths = [];
				for(var i = startPos+1 ; i < endPos ; i++){
					paths[i] = texts[i].trim().replace("- ","");
				}

				let fileClass = "";
				
				paths.forEach(path => {
						let splittedPath = path.split("/");
						let className = splittedPath[splittedPath.length - 2];
						className = className.replace(/(\w)(\w*)/g,function(_,g1,g2){return g1.toUpperCase() + g2.toLowerCase();});

						fileClass += "class Asset"+className+" {\n";

						fs.readdirSync(folder.uri.path+"/"+path).forEach(file => {
							let splittedFilePath = file.split("/");
							let varName = splittedFilePath[splittedFilePath.length -1].split(".")[0];
							varName = varName.replace(RegExp("_","g")," ");
							varName = toCamelCase(varName);

							fileClass += "	static final String "+varName+" = '"+path+file+"';\n";							
					  	});
						fileClass += "}\n\n";
				 	}
				);

				fs.writeFile(folder.uri.path+"/lib/r.dart",fileClass,function(err) {
					if (err) {
						vscode.window.showInformationMessage(err.message);
						return console.error(err);
					}
					vscode.window.showInformationMessage("Asset class succesfully generated!");
				});
			  });
		});
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
