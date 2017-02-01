'use strict'

class AbstractSpeechService {

    /*
    * @param {jQuery} $scope Contains .chat
    * */
    constructor(name, $scope) {
        this.name = name;
        this.$scope = $scope;
        this.$chat = $('.chat', $scope);
        this.$jsonResponse = $('.json-response', $scope);
        this.$htmlResponse = $('.html-response', $scope);
        this.$chatCommandSrc = $('#src .msg.command');
        this.$chatResponseSrc = $('#src .msg.response');

        this.apiUrl = '';
        this.apiKey = '';

        this.waitingForResponse = false;
        this.queryCommands = new Array();
    }



    /*
     * SERVICE
     * */
    query(command) {
        return new Promise((resolve, reject) => {
            this.queryCommands.push(command);

            this.processCommands().then(
                function (data) {
                    resolve(data);
                },
                function (err) {
                    reject(err);
                });
        });
    }

    processCommands() {}

    setJsonResponse(msg) {
        this.$jsonResponse.html(this.syntaxHighlight(msg));
    }

    setHtmlResponse(html) {
        this.$htmlResponse.html(html);
    }



    /*
    * CHAT
    * */
    addChatCommand(command) {
        this.$chat.append(this.$chatCommandSrc.clone().text(command));
        this.scrollChat();
    }

    addChatResponse(response) {
        this.$chat.append(this.$chatResponseSrc.clone().text(response));
        this.scrollChat();
    }



    /*
    * AIDING METHODS
    * */
    scrollChat() {
        this.$chat.scrollTop(this.$chat[0].scrollHeight);
    }

    syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }

        json = json
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br/>')
            .replace(/\s/g, '&nbsp;');

        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }

            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    getName() {
        return this.name;
    }
}