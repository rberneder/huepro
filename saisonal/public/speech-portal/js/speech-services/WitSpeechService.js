'use strict'

class WitSpeechService extends AbstractSpeechService {

    constructor($scope) {
        super('wit.ai', $scope);
        this.apiUrl = 'https://api.wit.ai/message';
        this.apiKey = 'IMAB5667R3FKV3LZYRX7GGHPKROVB76J';
    }


    processCommands() {
        return new Promise((resolve, reject) => {
            var command = this.queryCommands.pop();

            if (command) {
                this.waitingForResponse = true;

                $.ajax({
                    url: 'https://api.wit.ai/message',
                    data: {
                        'q': command,
                        'access_token': this.apiKey
                    },
                    dataType: 'jsonp',
                    method: 'GET'
                }).done(msg => {
                    this.addChatCommand(command);
                    this.addChatResponse(msg._text);
                    this.setJsonResponse(msg);

                    if (msg.data) {
                        var responseHTML = '';
                        for (var i = 0; i < msg.data.length; i++) {
                            responseHTML += msg.data[i];
                        }
                        this.setHtmlResponse(responseHTML);
                    } else {
                        this.setHtmlResponse('<i>&nbsp;nothing to show</i>');
                    }

                    resolve(msg);

                }).fail(err => {
                    this.addChatResponse('Error: ' + err);
                    reject(err);

                }).always(() => {
                    this.waitingForResponse = false;
                    this.processCommands();
                });
            }
        });
    }
}